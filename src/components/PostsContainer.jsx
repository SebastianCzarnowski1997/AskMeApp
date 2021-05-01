import React, { useEffect, useState } from 'react';
import NewPost from './NewPost';
import {firestore } from "../firebase/firebase.utils";
import SinglePost from './SinglePost';
import replaceCurseWords from '../replaceCurseWords';
import SeachPost from './SearchPost';

const PostsContainer = (props) =>{
  const [posts, setPosts] = useState([]);
  const [queryInput, setQueryInput] = useState('');
  const { currentUser, category } = props;
  const postsArr = []
  useEffect(() => {
    firestore.collection("Posts").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if(doc.data().category===category){
          postsArr.push({ ...doc.data(), docId: doc.id })
        }
      });
    });
    setPosts(postsArr);
  }, []);
  const createPost = async (content)  => {
    const cleanContent= await replaceCurseWords(content)
    await firestore.collection("Posts").doc().set({
      content: cleanContent,
      author: currentUser.id,
      place: currentUser.place ? currentUser.place: '',
      authorDisplayName: currentUser.displayName,
      category: category,
      coments: [],
    })
    const postsArr = []

    await firestore.collection("Posts").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if(doc.data().category===category){
          postsArr.push({ ...doc.data(), docId: doc.id })
        }
      });
    });
    setPosts(postsArr);
  }

  const createComent = async (coment, docid)  => {
    const cleanContent= await replaceCurseWords(coment)
    const otherComents = posts.filter(item => item.docId === docid)[0].coments
    await firestore.collection("Posts").doc(docid).update({
      coments: [ ...otherComents, {
        coment: cleanContent,
        author: currentUser.id,
        authorDisplayName: currentUser.displayName }]
    })

    const postsArr = []
    await firestore.collection("Posts").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if(doc.data().category===category){
          postsArr.push({ ...doc.data(), docId: doc.id })
        }
      });
    });
    setPosts(postsArr);
  }
  const setQueryFunc = (event) => {
    setQueryInput(event.target.value)
  }
  return (
    <div>
      <br/><NewPost createPost={createPost} currentUser={currentUser}/><br/>
      <SeachPost searchFunc={setQueryFunc} searchInput={queryInput} />
      {posts.filter(post => post.content.includes(queryInput)).map(post => (
        <SinglePost createComent={createComent} currentUser={currentUser} key={post.docId} post={post} />
      ))}
    </div>
  );
};

export default PostsContainer;