import React, { useState } from "react";
import { Segment, Form, Button, Label } from "semantic-ui-react";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  if (!props.show) {
    return null;
  }

  const submit = async (e) => {
    e.preventDefault();

    await props.addBook({
     variables: { title, author, published: Number(published), genres }
   })

    setTitle("");
    setPublished("");
    setAuhtor("");
    setGenres([]);
    setGenre("");
  }

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  }

  return (
    <Segment>
      <Form onSubmit={ submit }>
        <Form.Field>
          <Label color="black" htmlFor="title">title</Label>
          <input
            value={ title }
            onChange={ ({ target }) => setTitle(target.value) }
            name="title"
          />
        </Form.Field>

        <Form.Field>
          <Label color="black" htmlFor="author">author</Label>
          <input
            value={ author }
            name="author"
            onChange={ ({ target }) => setAuhtor(target.value) }
          />
        </Form.Field>

        <Form.Field>
          <Label color="black" htmlFor="published">published</Label>
          <input
            type="number"
            value={ published }
            name="published"
            onChange={ ({ target }) => setPublished(target.value) }
          />
        </Form.Field>

        <Form.Field>
          <Label color="black" htmlFor="genre">genre</Label>
          <input
            value={ genre }
            name="genre"
            onChange={ ({ target }) => setGenre(target.value) }
          />
          <Button onClick={ addGenre } type="button">Add genre</Button>

          <Segment>
          Genres: { genres.join(" ") }
          </Segment>
        </Form.Field>

        <Button fluid size="big" positive type="submit">Create book</Button>
      </Form>
    </Segment>
  );
};

export default NewBook;
