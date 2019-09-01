import React, { useState } from "react";
import { Segment, Header, Table } from "semantic-ui-react";

const Authors = ({ result, show }) => {
  if (!show) {
    return null;
  }

  if (result.loading) {
    return (
      <Segment loading>
        <Header as="h2" block>Authors</Header>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Born</Table.HeaderCell>
              <Table.HeaderCell>Books</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      </Segment>
    );
  }


  const authors = result.data.allAuthors.map(a => (
    <Table.Row key={ a.id }>
      <Table.Cell>
        { a.name }
      </Table.Cell>

      <Table.Cell>
        { a.born || "unknown" }
      </Table.Cell>

      <Table.Cell>
        { a.bookCount }
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Segment>
      <Header as="h2" block>Authors</Header>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Born</Table.HeaderCell>
            <Table.HeaderCell>Books</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { authors }
        </Table.Body>
      </Table>

    </Segment>
  );
};

export default Authors;
