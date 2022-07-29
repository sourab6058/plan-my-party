import { Paper } from "@mui/material";
import React, { Component } from "react";
import axios from "axios";

const SELLERS_API = process.env.REACT_APP_SELLERS_API;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default class PartyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: null,
    };
  }
  componentDidMount() {
    const seller_id = this.props.item.seller_id;
    console.log(seller_id);
    axios.get(`${SELLERS_API}/${seller_id}`).then((res) => {
      console.log(res.data);
      this.setState({ seller: res.data[0] });
    });
  }
  render() {
    return (
      <div>
        {this.state.seller && (
          <Paper className="carousel-card">
            <img
              src={`${BASE_URL}/uploads/${this.props.item.imgs_url}`}
              width="100%"
              height="280px"
              style={{ border: "4px 4px 0 0 " }}
            />
            <div className="card-description">
              <img
                className="seller-img"
                src={`${BASE_URL}/uploads/${this.state.seller.img_url}`}
                width="40px"
                height="40px"
              />
              <div className="card-description-text">
                <h4 className="description-heading">
                  {this.state.seller.username}
                </h4>
                <p className="description-text">{this.props.item.type}</p>
              </div>
            </div>
          </Paper>
        )}
      </div>
    );
  }
}
