import React, { useState } from "react";
import { Segment, Header, Table, Checkbox, Button } from "semantic-ui-react";

const Books = ({ result, show }) => {
  const [chosenGenres, setChosenGenres] = useState([]);
  const [filterGenres, setFilterGenres] = useState([]);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return (
      <Segment loading>
        <Header as="h2" block>Books</Header>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Published</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      </Segment>
    );
  }


  const books = result.data.allBooks
  .filter(b => (filterGenres.length) ? filterGenres.every(g => b.genres.includes(g)) : b)
  .map(b => (
    <Table.Row key={ b.id }>
      <Table.Cell>
        { b.title }
      </Table.Cell>

      <Table.Cell>
        { b.author.name }
      </Table.Cell>

      <Table.Cell>
        { b.published }
      </Table.Cell>
    </Table.Row>
  ));

  const handleGenreCheck = (event, data) => {
      if (data.checked) {
        setChosenGenres(chosenGenres.concat(data.label));
        setFilterGenres(chosenGenres.concat(data.label));
      }
      else {
        setChosenGenres(chosenGenres.filter(g => g !== data.label));
        setFilterGenres(chosenGenres.filter(g => g !== data.label));
      }

  };


  const allGenres = Array.from(new Set([].concat.apply([], result.data.allBooks.map(b => b.genres))));

  const genres = allGenres.map(g => <Checkbox toggle checked={ filterGenres.includes(g) } key={ g } label={ g } onChange={ handleGenreCheck }/>);

  const selectAllGenres = (event, data) => {
    if (data.checked)
      return setFilterGenres(allGenres);

    setFilterGenres(chosenGenres);
  };

  return (
    <Segment>
      <Header as="h2" block>Books</Header>

      <Segment>
        <Header as="h3" block>Filter by genre</Header>
        <Checkbox color="violet" toggle onChange={ selectAllGenres } label="All"/>

        <Segment>
          { genres }
        </Segment>
      </Segment>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>Published</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { books }
        </Table.Body>
      </Table>

    </Segment>
  );
};

export default Books;
