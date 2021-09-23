import { tambahFitur } from "actions/FiturAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import DefaultImage from "../../assets/img/default-image.jpg";

class TambahFitur extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: DefaultImage,
      imageToDB: false,
      namaFitur: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(gambar),
        imageToDB: gambar,
      });
    }
  };

  handleSubmit = (event) => {
    const { imageToDB, namaFitur } = this.state;
    event.preventDefault();
    if (imageToDB && namaFitur) {
      //proses lanjut ke action firebase
      this.props.dispatch(tambahFitur(this.state));
    } else {
      //alert
      swal("Failed!", "Maaf Nama Fitur dan Logo Fitur harus diisi", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const { tambahFiturResult } = this.props;

    if (
      tambahFiturResult &&
      prevProps.tambahFiturResult !== tambahFiturResult
    ) {
      swal("Sukses", "Fitur Sukses Dibuat", "success");
      this.props.history.push("/admin/Fitur");
    }
  }

  render() {
    const { image, namaFitur } = this.state;
    const { tambahFiturLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/Fitur" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Tambah Fitur</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <img src={image} width="200" alt="Logo Fitur" />
                  </Col>
                </Row>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Logo Fitur</label>
                        <Input
                          type="file"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Fitur</label>
                        <Input
                          type="text"
                          value={namaFitur}
                          name="namaFitur"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {tambahFiturLoading ? (
                        <Button color="primary" type="submit" disabled>
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <Button color="primary" type="submit">
                          Submit
                        </Button>
                      )}
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tambahFiturLoading: state.FiturReducer.tambahFiturLoading,
  tambahFiturResult: state.FiturReducer.tambahFiturResult,
  tambahFiturError: state.FiturReducer.tambahFiturError,
});

export default connect(mapStateToProps, null)(TambahFitur);
