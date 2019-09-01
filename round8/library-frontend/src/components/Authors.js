import React, { useState } from "react";
import {
  Segment,
  Header,
  Table,
  Label,
  Button,
  Modal,
  Icon,
  Form
} from "semantic-ui-react";

const Authors = ({ result, show, editAuthor }) => {
  const [selection, setSelection] = useState(null);
  const [born, setBorn] = useState("");

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

  const editBorn = (author) => {
    setBorn(author.born || "");
    setSelection(author);
  };

  const handleSubmit = async (sendValue) => {
    if (sendValue)
      await editAuthor({
       variables: { name: selection.name, born: Number(born) }
     });

    setSelection(null);
    setBorn(null);
  };

  const authors = result.data.allAuthors.map(a => (
    <Table.Row key={ a.id }>
      <Table.Cell>
        { a.name }
      </Table.Cell>

      <Table.Cell>
        <Button as="div" labelPosition="left">
          <Label pointing="right">
            { a.born || "unknown" }
          </Label>
          <Button color="purple" onClick={ () => editBorn(a) }>
            Edit
          </Button>
        </Button>
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

      <Modal basic open={ selection !== null } size="small">
        <Header icon="hourglass" content="Set year of birth" />

        <Modal.Content>

          <p>
            Set <strong>{ (selection) ? selection.name : "TEMP" }</strong>'s year of birth.
          </p>

          <p>
            It's currently <strong>{ (selection) ? (selection.born || "unknown") : "TEMP" }</strong>.
          </p>

          <Form>
            <Form.Field>
              <Label htmlFor="born">born</Label>
              <input
                type="number"
                value={ born }
                name="born"
                onChange={ ({ target }) => setBorn(target.value) }
              />
            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button.Group>
            <Button basic color="red" inverted onClick={ () => handleSubmit(false) }>
              <Icon name="remove" />
              Cancel
            </Button>

            <Button.Or />

            <Button color="green" inverted onClick={ () => handleSubmit(true) }>
            <Icon name="checkmark" /> Submit
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>

    </Segment>
  );
};

export default Authors;
