import React from "react";
import ReactTags from "react-tag-autocomplete";
import { TAGS } from "./constants/tags";
class TagComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: this.props.tags,
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
        classNames={{
          root: "react-tags  mt-1",
          rootFocused: "is-focused",
          selected: "react-tags__selected border w-100 min-height",
          selectedTag: "react-tags__selected-tag btn btn-info m-1",
          selectedTagName: "react-tags__selected-tag-name",
          search: "react-tags__search",
          searchWrapper: "react-tags__search-wrapper",
          searchInput: "react-tags__search-input",
          suggestions: "react-tags__suggestions ms-1",
          suggestionActive: "is-active",
          suggestionDisabled: "is-disabled",
          suggestionPrefix: "react-tags__suggestion-prefix",
        }}
        minQueryLength={1}
        autoresize={false}
        noSuggestionsText={"No tags found"}
        maxSuggestionsLength={10}
        placeholderText={"Add a tag"}
      />
    );
  }
}
export default TagComponent;
