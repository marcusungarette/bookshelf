// Libs
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Components
import Search from '../../components/search';
import Book from '../../components/book';

const Container = styled.div`
  width: 70%;
`;

const List = styled.ul`
  width: 100%;
  margin: 0 auto;
`;

const Discover = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/discover`)
      .then(res => res.json())
      .then(res => {
        setBooks(res.books);
        setLoading(false);
      })
      .catch((err) => { })
  }, []);

  const updateBooks = (book) => {
    const index = books.findIndex(x => x.id === book.id);
    const newBooks = books.filter(item => item.id !== book.id);

    newBooks.splice(index, 0, book);

    setBooks(newBooks);
  };

  const filterBooks = (books) => {
    setBooks(books);
    setLoading(false);
  };

  return (
    <Container>
      <Search
        filterBooks={filterBooks}
        setLoading={setLoading}
      />
      {loading && (
        <span data-testid='discover-loading'>Loading...</span>
      )}
      {!loading && (
        <List data-testid='discover-list'>
          {books.map((book) => (
            <Book
              key={book.id}
              info={book}
              updateBooks={updateBooks}
            />
          ))}
        </List>
      )}
    </Container>
  );
};

export default Discover;
