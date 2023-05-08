import {
 createUserWithEmailAndPassword,
 onAuthStateChanged,
 sendPasswordResetEmail,
 signInWithEmailAndPassword,
 signOut,
 updateEmail,
 updatePassword,
} from "firebase/auth";
import { React, useContext, useState, useEffect, createContext } from "react";
import auth from "../firebase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
 const [currentUser, setCurrentUser] = useState();
 const [loading, setLoading] = useState(true);

 const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
 };
 const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
 };

 const logout = () => {
  return signOut(auth);
 };

 const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
 };
 const updateUserEmail = (email) => {
  return updateEmail(auth.currentUser, email);
 };
 const updateUserPassword = (password) => {
  return updatePassword(auth.currentUser, password);
 };

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
   setCurrentUser(user);
   setLoading(false);
  });
  return () => {
   unsubscribe();
  };
 }, []);
 const [data, setData] = useState([]);
 const [news, setNews] = useState([]);
 const [imageSlider, setImageSlider] = useState([]);
 const [neleryaptik, setNeleryaptik] = useState([]);
 const [searchTermApi, setSearchTermApi] = useState('');




 return (
  <AuthContext.Provider
   value={{
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    data,
    setData,
    news,
    setNews,
    imageSlider,
    setImageSlider,
    neleryaptik,
    setNeleryaptik,
    searchTermApi,
    setSearchTermApi
   }}
  >
   {!loading && children}
  </AuthContext.Provider>
 );
};

export const useAuth = () => {
 return useContext(AuthContext);
};
export default AuthProvider;