import React from "react";
import { Segment, Header, Table } from "semantic-ui-react";

const Books = ({ result, show }) => {
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


  const books = result.data.allBooks.map(b => (
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

  return (
    <Segment>
      <Header as="h2" block>Books</Header>

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
