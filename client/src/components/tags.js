import React from "react";
import ReactTags from "react-tag-autocomplete";
import { TAGS } from "./constants/tags";
class TagComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: TAGS,
    };

    this.reactTags = React.createRef();
  }

  onDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  onAddition(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
  }

  render() {
    return (
      <ReactTags
        ref={this.reactTags}
        tags={this.state.tags}
        suggestions={this.state.suggestions}
        onDelete={this.onDelete.bind(this)}
        onAddition={this.onAddition.bind(this)}
      />
    );
  }
}
export default TagComponent;
