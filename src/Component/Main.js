import React from "react";
import { Col, Row, Container, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "", author: "", text: "" };
    this.randomQuoteAndColor = this.randomQuoteAndColor.bind(this);
  }

  randomQuoteAndColor() {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ text: data.content, author: data.author });
      });
    this.randomColor();
  }

  randomColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    function ColorLuminance(hex, lum) {
      // validate hex string
      hex = String(hex).replace(/[^0-9a-f]/gi, "");
      if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      lum = lum || 0;

      // convert to decimal and change luminosity
      var rgb = "#",
        c,
        i;
      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
      }

      return rgb;
    }
    this.setState({ color: ColorLuminance(randomColor, -0.3) });
  }

  componentDidMount() {
    this.randomQuoteAndColor();
  }

  render() {
    return (
      <div className="main" style={{ backgroundColor: this.state.color }}>
        <div>
          <Container>
            <Row className="justify-content-center">
              <h1 className="title">Random Quote</h1>
            </Row>
            <div className="wrapper" id="quote-box">
              <Row>
                <blockquote>
                  <p id="text" style={{ color: this.state.color }}>
                    {this.state.text} {"  "}
                    <FontAwesomeIcon
                      icon={faQuoteRight}
                      style={{ marginLeft: "0.3em" }}
                      size="sm"
                    />
                  </p>
                  <p id="author" style={{ color: this.state.color }}>
                    -- {this.state.author}
                  </p>
                </blockquote>
              </Row>
              <Row className="d-flex justify-content-center align-items-center">
                <Col>
                  <Button style={{ backgroundColor: this.state.color }}>
                    <a
                      id="tweet-quote"
                      href="twitter.com/intent/tweet"
                      target="_black"
                    >
                      <FontAwesomeIcon icon={faTwitter} color="white" />
                    </a>
                  </Button>
                </Col>
                <Col className="text-right">
                  <Button
                    id="new-quote"
                    style={{
                      backgroundColor: this.state.color,
                    }}
                    onClick={() => {
                      this.randomQuoteAndColor();
                    }}
                  >
                    <div className="text-center">New Quote</div>
                  </Button>
                </Col>
              </Row>
            </div>
            <Row className="justify-content-center">
              <div className="by">By Bruno Umbelino</div>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
