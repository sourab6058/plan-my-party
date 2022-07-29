import axios from "axios";
import React, { Component } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import "../../css/Package.css";

const PACKAGES_API = process.env.REACT_APP_PACKAGES_API;

export default class PackagesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packageName: "",
      packages: [],
    };
  }
  componentDidMount() {
    let url = new URL(window.location.href);
    let packageName = url.searchParams.get("package");
    console.log(packageName);
    if (packageName) {
      this.setState({ packageName });
      axios
        .get(`${PACKAGES_API}/${packageName}`)
        .then((res) => this.setState({ packages: res.data }));
    } else {
      axios
        .get(PACKAGES_API)
        .then((res) => this.setState({ packages: res.data }));
    }
  }
  render() {
    return (
      <>
        {this.state.packageName !== "" && (
          <Typography variant="h4">
            Results for : "{this.state.packageName}"
          </Typography>
        )}
        <div className="grid">
          {this.state.packages.map((pkg) => (
            <PackageCard props={pkg} />
          ))}
        </div>
      </>
    );
  }
}

function PackageCard({ props }) {
  function handleChatClick() {
    let user = localStorage.getItem("user-dets");
    if (!user) return;
    user = JSON.parse(user);
    if (user.type === "seller") return;
    const seller_id = props.seller_id;
    const user_id = user.id;
    const room =
      user_id < seller_id
        ? `${user_id}X${seller_id}`
        : `${seller_id}X${user_id}`;

    const chat_info = {
      seller: seller_id,
      client: user.id,
      room,
      package: props.id,
    };
    window.location.href = `/client-chat?chat_info=${JSON.stringify(
      chat_info
    )}`;
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={`http://localhost:8000/uploads/${props.imgs_url}`}
        alt="desc photo"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {props.description}
        </Typography>
        <Typography variant="body3" color="text.primary">
          Price: ₹{props.price}
        </Typography>
        <br />
        <Typography color="text.secondary">Type: {props.type}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleChatClick}>
          Chat
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
