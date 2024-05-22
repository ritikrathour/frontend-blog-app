import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./Blog-app/components/PrivateRoute";  
import Loader from "./Blog-app/components/Loader";
import Home from "./Blog-app/pages/Home";
import NavBar from "./Blog-app/layout/NavBar";
import Footer from "./Blog-app/layout/Footer"; 
 const NotFind = lazy(()=>import("./Blog-app/pages/NotFind"))
 const CreatePost = lazy(()=>import("./Blog-app/pages/CreatePost"))
 const UpdatePost = lazy(()=>import("./Blog-app/pages/UpdatePost"))
 const PostPage = lazy(()=>import("./Blog-app/pages/PostPage"))
 const BlogPosts = lazy(()=>import("./Blog-app/pages/Blog-posts"))
 const SearchPage = lazy(()=>import("./Blog-app/pages/SearchPage"))
 const EditUserRole = lazy(()=>import("./Blog-app/pages/SearchPage"));
 const DashBoardProfile = lazy(()=>import("./Blog-app/pages/DashBoardProfile"))
 const SignUp = lazy(()=>import("./Blog-app/pages/SignUp"))
 const SignIn = lazy(()=>import("./Blog-app/pages/SignIn"))
 const PrivateAdminRoute = lazy(()=>import("./Blog-app/components/PrivateAdminRoute"))
 const App = () => {
    return (
        <>
             <Suspense fallback={<div className="h-screen w-full flex justify-center items-center"><Loader/></div>}>

                <header className="px-2 lg:px-14 fixed w-full dark:bg-slate-800 bg-slate-100 z-50">
                    <NavBar />
                </header>
                <main className="px-4 overflow-x-hidden pt-12">
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/edit-user-role/:userId" element={<EditUserRole />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/dashboard" element={<DashBoardProfile />} />
                        </Route>
                        <Route element={<PrivateAdminRoute />}>
                            <Route path="/create-post" element={<CreatePost />} />
                            <Route path="/update-post/:postId" element={<UpdatePost />} />
                        </Route>
                        <Route path="/post/:slug" element={<PostPage />} />
                        <Route path="/blog-posts" element={<BlogPosts />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/*" element={<NotFind />} />
                    </Routes>
                </main>
                <footer className="px-4">
                    <Footer />
                </footer>
            </Suspense>
        </>
    )
}

export default App