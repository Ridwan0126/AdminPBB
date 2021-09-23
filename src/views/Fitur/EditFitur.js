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
import { updateFitur, getDetailFitur } from "../../actions/FiturAction";
import DefaultImage from "../../assets/img/default-image.jpg";

class EditFitur extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      imageLama: DefaultImage,
      image: DefaultImage,
      imageToDB: false,
      namaFitur: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(getDetailFitur(this.props.match.params.id));
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
    const { namaFitur } = this.state;
    event.preventDefault();
    if (namaFitur) {
      //proses lanjut ke action firebase
      this.props.dispatch(updateFitur(this.state));
    } else {
      //alert
      swal("Failed!", "Maaf Nama Fitur harus diisi", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const { updateFiturResult, getDetailFiturResult } = this.props;

    if (
      updateFiturResult &&
      prevProps.updateFiturResult !== updateFiturResult
    ) {
      swal("Sukses", "Fitur Sukses Diupdate", "success");
      this.props.history.push("/admin/Fitur");
    }

    if (
      getDetailFiturResult &&
      prevProps.getDetailFiturResult !== getDetailFiturResult
    ) {
      this.setState({
        image: getDetailFiturResult.image,
        namaFitur: getDetailFiturResult.namaFitur,
        imageLama: getDetailFiturResult.image,
      });
    }
  }

  render() {
    const { image, namaFitur } = this.state;
    const { updateFiturLoading } = this.props;
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
                <CardTitle tag="h4">Edit Fitur</CardTitle>
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
                      {updateFiturLoading ? (
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
  updateFiturLoading: state.FiturReducer.updateFiturLoading,
  updateFiturResult: state.FiturReducer.updateFiturResult,
  updateFiturError: state.FiturReducer.updateFiturError,

  getDetailFiturLoading: state.FiturReducer.getDetailFiturLoading,
  getDetailFiturResult: state.FiturReducer.getDetailFiturResult,
  getDetailFiturError: state.FiturReducer.getDetailFiturError,
});

export default connect(mapStateToProps, null)(EditFitur);
