import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Dummy",
        avatar_url: "dummy",
      },
    };
  }

  async componentDidMount() {
    // api call
    const data = await fetch("https://api.github.com/users/anuj-thakur-513");
    const json = await data.json();

    this.setState({
      userInfo: json,
    });

    console.log("class based: " + json);
  }

  render() {
    const { name, location, avatar_url, twitter_username } =
      this.state.userInfo;

    return (
      <div className="user-card">
        <img src={avatar_url} alt="avatar_url" />
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: {twitter_username}</h4>
      </div>
    );
  }
}

export default UserClass;
