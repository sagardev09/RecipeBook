"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where, setDoc, doc, updateDoc, arrayUnion, getDoc, } from "firebase/firestore";
import { app } from "@/utils/FirebaseConfig"
import { toast } from 'react-toastify';



const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const [user, setuser] = useState(null)
    const [UserDetails, setUserDetails] = useState({})
    const [AllReciepe, setAllReciepe] = useState([])
    const [SearchRecipe, setSearchRecipe] = useState(AllReciepe)
    const [searchtext, setsearchtext] = useState("")
    const [savedpost, setsavedpost] = useState([])
    // const [error, setError] = useState(null);

    const FetchCurrUserDetails = async (userId) => {
        try {
            // Assuming "users" is the collection where user details are stored
            const q = query(collection(db, "users"), where("userid", "==", userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    setUserDetails(userData); // Update state with fetched user data
                    console.log(userData);
                });
            } else {
                console.log("No matching documents.");
            }
        } catch (error) {
            console.log("Error getting documents: ", error);
        }
    }

    //sign up / create the user

    const signup = (userdata) => {
        createUserWithEmailAndPassword(auth, userdata.email, userdata.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);

                // Store the user in the database
                const userRef = doc(db, "users", user.uid);
                setDoc(userRef, {
                    userid: user.uid,
                    name: userdata.name,
                    email: userdata.email,
                    imgurl: "",
                })
                    .then(() => {
                        console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            })
            .catch((error) => {
                console.error("Error signing up: ", error.code);
                alert(error.code);
                setuser(null); // Assuming setuser is a state setter function
            });
    };

    // login user  with email and password

    const login = (user) => {
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                const loggedInUser = userCredential.user;

                // Use onAuthStateChanged to update user state
                onAuthStateChanged(auth, (User) => {
                    if (User) {
                        // User is signed in
                        setuser(User);
                        console.log(loggedInUser, "User");
                    } else {
                        // User is signed out
                        setuser(null);
                    }
                });

                console.log(loggedInUser, "User");
            })
            .catch((err) => {
                if (
                    err.code === AuthErrorCodes.INVALID_PASSWORD ||
                    err.code === AuthErrorCodes.USER_DELETED
                ) {
                    console.log("The email address or password is incorrect");
                } else {
                    console.log(err.code);
                    alert(err.code);
                }
            });
    }


    // logout function

    const logout = async () => {
        try {
            await signOut(auth)
            setuser(null)
            toast.success("logged out");
        } catch (e) {
            console.log(e);
        }
    }

    // fetch all users recpieces on home page

    const fetchAllReceiepe = async () => {
        try {
            const reciepeArray = [];
            const querySnapshot = await getDocs(collection(db, "receiepe"));
            querySnapshot.forEach((doc) => {
                reciepeArray.push(doc.data());
            });
            setAllReciepe(reciepeArray);
            setSearchRecipe(reciepeArray)
            console.log(reciepeArray, "reciepeArray");
        } catch (error) {
            console.log(error);
        }
    }

    // search recipe by different aspects like username ,category ,title

    const Search = () => {
        const filteredRecipes = AllReciepe.filter(recipe =>
            recipe.title.toLowerCase().includes(searchtext.toLowerCase()) ||
            recipe.category.toLowerCase().includes(searchtext.toLowerCase()) ||
            recipe.desc.toLowerCase().includes(searchtext.toLowerCase()) ||
            recipe.userName.toLowerCase().includes(searchtext.toLowerCase())
        );
        setSearchRecipe(filteredRecipes)
    }

    //save recipe post for particular user

    const savepost = async (postId) => {
        try {
            const savedPostRef = doc(db, "savedPosts", UserDetails.userid);

            // Check if the post ID already exists in the array
            const savedPostSnapshot = await getDoc(savedPostRef);
            if (savedPostSnapshot.exists()) {
                const savedPostData = savedPostSnapshot.data();
                if (savedPostData.id.includes(postId)) {
                    console.log('Post already saved.');
                    return; // Exit function if post ID already exists
                }

                // If post ID doesn't exist, update the document and add the post ID to the array
                await updateDoc(savedPostRef, {
                    id: arrayUnion(postId),
                });
            } else {
                // If no saved posts exist for the user, create a new document with the post ID
                const postData = {
                    userName: UserDetails.name,
                    id: [postId],
                    userid: UserDetails.userid
                };

                await setDoc(savedPostRef, postData);
            }

            console.log('Post saved successfully.');
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };


    const fetchsavedpost = async () => {
        try {
            const savedPostRef = doc(db, "savedPosts", UserDetails.userid);

            const savedPostSnapshot = await getDoc(savedPostRef);

            if (savedPostSnapshot.exists()) {
                const savedPostData = savedPostSnapshot.data();
                // Check if the fetched data belongs to the current user
                if (savedPostData.userid === UserDetails.userid) {
                    // Data belongs to the current user
                    const savedPostIds = savedPostData.id;
                    const fetchedPosts = [];

                    // Iterate over the array of IDs and fetch each post
                    for (const postId of savedPostIds) {
                        const postRef = doc(db, "receiepe", postId);
                        const postSnapshot = await getDoc(postRef);

                        if (postSnapshot.exists()) {
                            const postData = postSnapshot.data();
                            fetchedPosts.push(postData);
                        }
                    }

                    // Log the fetched posts
                    setsavedpost(fetchedPosts)
                    console.log('Fetched posts:', fetchedPosts);
                } else {
                    // Data does not belong to the current user
                    console.log('No saved posts found for the current user.');
                }
            } else {
                console.log('No saved posts found.');
            }
        } catch (error) {
            console.error('Error fetching saved posts:', error);
        }
    };




    useEffect(() => {
        // Use onAuthStateChanged to handle initial authentication state
        const unsubscribe = onAuthStateChanged(auth, (User) => {
            if (User) {
                // User is signed in
                FetchCurrUserDetails(User.uid)

                console.log("UserDetails", UserDetails);
                setuser(User);
                console.log(User, "User");
            } else {
                // User is signed out
                setuser(null);
            }
        });

        return () => unsubscribe(); // Cleanup the listener when the component unmounts
    }, [auth]);



    return (
        <GlobalContext.Provider value={{ user, signup, login, logout, UserDetails, fetchAllReceiepe, AllReciepe, setSearchRecipe, SearchRecipe, setsearchtext, searchtext, Search, savepost, fetchsavedpost, savedpost }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(GlobalContext);
};