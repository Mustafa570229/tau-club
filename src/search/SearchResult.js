import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { db } from "../firebase"
import { collection, onSnapshot } from 'firebase/firestore';
import "./Search.css"

const SearchResult = () => {
  const location = useLocation();
  const [searchedItem, setSearchedItem] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const lastPathSegment = pathSegments[pathSegments.length - 1];
    setSearchedItem(lastPathSegment.toLowerCase());
  }, [location]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'neleryaptik'), (snapshot) => {
      const filteredDocs = snapshot.docs.filter(doc => {
        const {  title, content } = doc.data();
        return title.toLowerCase().includes(searchedItem) || content.toLowerCase().includes(searchedItem);
      }).map(doc => ({ id: doc.id, ...doc.data() }));

      const results = filteredDocs.map(({ id, title, content }) => {
        const highlightedTitle = title.replace(new RegExp(searchedItem, 'gi'), match => `<span class="highlighted">${match}</span>`);
        const highlightedContent = content.replace(new RegExp(searchedItem, 'gi'), match => `<span class="highlighted">${match}</span>`);
        return { id, title: highlightedTitle, content: highlightedContent };
      });

      setSearchResults(results);
    });
    return () => unsubscribe();
  }, [searchedItem]);

  return (
    <div>
      <h2>Result Search : <span>{searchedItem}</span></h2>
      {searchResults.map(({ id, title, content }) => (
         <div key={id} className='search-result'>
          <h4> <Link to={`/neler-yaptik/${id}`} dangerouslySetInnerHTML={{ __html: title }} /></h4>
          <h6><Link to={`/neler-yaptik/${id}`} dangerouslySetInnerHTML={{ __html: content }} /></h6>
           
         </div>
      ))}
    </div>
  );
};

export default SearchResult;
