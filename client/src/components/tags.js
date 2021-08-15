import React from "react";
import ReactTags from "react-tag-autocomplete";

class TagComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: [
        { id: 1, name: "Hostel" },
        { id: 2, name: "Club" },
        { id: 3, name: "Academic" },
        { id: 4, name: "Manthan" },
      ],
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
