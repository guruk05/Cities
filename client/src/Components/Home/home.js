import React from "react";
import "./home.css";
import { Card, Toast } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
const url = "https://nut-case.s3.amazonaws.com/jobs.json";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobDatas: [],
      jobs: [],
      value: [],
      loading: false,
      jobsPerPage: [10],
      currentPage: [1],
      currentJobs: [],
      showCard: false
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const jobData = await fetch(url);
    const data = await jobData.json();
    const jobs = data.data;
    this.setState({ jobDatas: jobs });
    this.setState({ loading: false });
    console.log("ComponentDidMOunt is Running");
  };

  handleInput = e => {
    this.setState({ value: e.target.value });
  };

  showCity = async index => {
    await this.setState({ jobs: this.state.jobDatas[index] });
    this.setState({ showCard: true });
    this.state.jobDatas.slice(0,10).map(cities => {
        let cityData = cities.location
        this.setState({value:cityData})
    })
    console.log(this.state.value);
    this.postData()
  };

  toggleCard = () => {
      this.setState({ showCard: false });
  }

   postData = async () => {
    console.log(this.state.jobDatas.slice(0,10));
    try {
        await axios.post("http://localhost:8000/cities", {
          data: this.state.jobDatas.slice(0,10)
        });
        console.log("posted successfully");
        console.log(this.state.data);
      } catch (err) {
        console.log(err);
      }
  };

  render() {
    const indexOfLastJob = this.state.currentPage * this.state.jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - this.state.jobsPerPage;
    const currentJobs = this.state.jobDatas.slice(
      indexOfFirstJob,
      indexOfLastJob
    );

    if (this.state.loading) {
      return (
        <div>
          <h3> loading ... </h3>
        </div>
      );
    }

    if (this.state.showCard === false) {
      return (
        <div className="cards">
          {currentJobs.map((jobs, index) => {
            return (
              <div>
                <br />
                <Card
                  onClick={this.showCity.bind(this, index)}
                  bg="light"
                  style={{ width: "18rem" }}
                >
                  <Card.Header>FitBots</Card.Header>
                  <Card.Body>
                    <Card.Title>Cities</Card.Title>
                    <Card.Text>{jobs.location}</Card.Text>
                  </Card.Body>
                </Card>
                <br />
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          <Toast className="maxCard">
            <Toast.Header onClick={this.toggleCard}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">City</strong>
              <small></small>
            </Toast.Header>
            <Toast.Body className="toastContent">{this.state.jobs.location}</Toast.Body>
          </Toast>
        </div>
      );
    }
  }
}

export default Home;