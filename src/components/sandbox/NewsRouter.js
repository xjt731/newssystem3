import React, { useEffect, useState } from 'react'
 import Home from '../../views/sandbox/home/Home'
 import Nopermission from '../../views/sandbox/nopermission/Nopermission'
 import RightList from '../../views/sandbox/right-manage/RightList'
import RoleList from '../../views/sandbox/right-manage/RoleList'
import UserList from '../../views/sandbox/user-manage/UserList'
import { Switch, Route, Redirect } from 'react-router-dom'
import NewsAdd from '../../views/sandbox/news-manage/NewsAdd'
import NewsDraft from '../../views/sandbox/news-manage/NewsDraft'
import NewsCategory from '../../views/sandbox/news-manage/NewsCategory'
import Audit from '../../views/sandbox/audit-manage/Audit'
import AuditList from '../../views/sandbox/audit-manage/AuditList'
 import Unpublished from '../../views/sandbox/publish-manage/Unpublished'
 import Published from '../../views/sandbox/publish-manage/Published'
 import Sunset from '../../views/sandbox/publish-manage/Sunset'
 import NewsPreview from '../../views/sandbox/news-manage/NewsPreview'
 import NewsUpdate from '../../views/sandbox/news-manage/NewsUpdate'
 import axios from 'axios'

 const LocalRouterMap = {
     "/home":Home,
    "/user-manage/list":UserList,
    "/right-manage/role/list":RoleList,
    "/right-manage/right/list":RightList,
    "/news-manage/add":NewsAdd,
    "/news-manage/draft":NewsDraft,
    "/news-manage/category":NewsCategory,
    "/audit-manage/audit":Audit,
    "/audit-manage/list":AuditList,
    "/publish-manage/unpublished":Unpublished,
    "/publish-manage/published":Published,
    "/publish-manage/sunset":Sunset,
    "/news-manage/preview/:id":NewsPreview,
    "/news-manage/update/:id":NewsUpdate,
 }

 export default function NewsRouter() {

     const [BackRouteList, setBackRouteList] = useState([])
     useEffect(()=>{
         Promise.all([ //两个回来再处理
             axios.get("http://localhost:3000/rights"), //输出：[{"id": 1,"title": "首页","key": "/home","pagepermisson": 1,"grade": 1},{"id": 2,"title": "用户管理","key": "/user-manage","pagepermisson": 1,"grade": 1},...]
             axios.get("http://localhost:3000/children"), // 输出：[{"id": 3, "title": "添加用户","rightId": 2,"key": "/user-manage/add","grade": 2},{"id": 4, "title": "删除用户","rightId": 2,"key": "/user-manage/delete","grade": 2},...]
         ]).then(res=>{
              //console.log(res)  //res输出：[{...},{...}] res[0]对应：axios.get("http://localhost:3000/rights"), res[1]对应：axios.get("http://localhost:3000/children"), 
             setBackRouteList([...res[0].data,...res[1].data]) 
             // console.log(BackRouteList)
         })
     },[])

     const {role:{rights}} = JSON.parse(localStorage.getItem("token"))  //role: {id: 1, roleName: "超级管理员", roleType: 1,rights: ["/user-manage/add", "/user-manage/delete", "/user-manage/update", "/user-manage/list"...]}

     const checkRoute = (item)=>{
         return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson) //路径&&开关没有关闭 
     }

     const checkUserPermission = (item)=>{
         return rights.includes(item.key)  //localStorage.getItem("token")当前用户存在localStorage的权限
     }

     return (
         <Switch>
             {
                 BackRouteList.map(item=>
                     {
                         if(checkRoute(item) && checkUserPermission(item)){
                             return <Route path={item.key} key={item.key} component={LocalRouterMap[item.key]} exact/> 
                         }
                         return null
                     }   
                 )
             }

             <Redirect from="/" to="/home" exact />
             {
                 BackRouteList.length>0 && <Route path="*" component={Nopermission} />
             }
         </Switch>
     )
 }