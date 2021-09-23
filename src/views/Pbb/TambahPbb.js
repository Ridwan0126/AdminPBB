import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import { tambahPbb, updatePbb } from "../../actions/PBBAction";
import { getListFitur } from "../../actions/FiturAction";

class TambahPbb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: "",
      tagihan: 0,
      nop: 0,
      jenis: "",
      tahuns: ["2021", "2020", "2019", "2018", "2017"],
      tahunSelected: [],
      ready: true,
      Fitur: "",
      alamat: "",
      objek: "",
      estimasi: "",
      tempo: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(getListFitur());
  }

  componentDidUpdate(prevProps) {
    const { updatePbbResult, tambahPbbResult } = this.props;

    if (updatePbbResult && prevProps.updatePbbResult !== updatePbbResult) {
      this.setState({
        [updatePbbResult.imageToDB]: updatePbbResult.image,
      });

      swal("Sukses", "Gambar Berhasil di Upload", "success");
    }

    if (tambahPbbResult && prevProps.tambahPbbResult !== tambahPbbResult) {
      swal("Sukses", "Tambah Pbb Sukses Dibuat", "success");
      this.props.history.push("/admin/Pbb");
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheck = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    if (checked) {
      //jika user ceklis tahun
      //isi state array tahun selected
      this.setState({
        tahunSelected: [...this.state.tahunSelected, value],
      });
    } else {
      //jika user menghapus ceklis tahun
      const tahunBaru = this.state.tahunSelected
        .filter((tahun) => tahun !== value)
        .map((filtertahun) => {
          return filtertahun;
        });

      this.setState({
        tahunSelected: tahunBaru,
      });
    }
  };

  handleImage = (event, imageToDB) => {
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];
      this.setState({
        [event.target.name]: URL.createObjectURL(gambar),
      });

      this.props.dispatch(updatePbb(gambar, imageToDB));
    }
  };

  handleSubmit = (event) => {
    const {
      nop,
      tagihan,
      nama,
      Fitur,
      tahunSelected,
      jenis,
      alamat,
      objek,
      estimasi,
      tempo,
    } = this.state;

    event.preventDefault();

    if (
      nama &&
      nop &&
      Fitur &&
      alamat &&
      objek &&
      estimasi &&
      tempo &&
      tagihan &&
      tahunSelected &&
      jenis
    ) {
      //action
      this.props.dispatch(tambahPbb(this.state));
    } else {
      swal("Failed", "Maaf semua form wajib diisi", "error");
    }
  };

  render() {
    const {
      nop,
      tagihan,
      alamat,
      objek,
      estimasi,
      tempo,
      jenis,
      Fitur,
      nama,
      ready,
      tahuns,
    } = this.state;
    const { getListFiturResult, tambahPbbLoading } = this.props;

    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/Pbb" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader tag="h4">Tambah PBB</CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Pembayar</label>
                        <Input
                          type="text"
                          value={nama}
                          name="nama"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Fitur</label>
                            <Input
                              type="select"
                              name="Fitur"
                              value={Fitur}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value="">--Pilih--</option>
                              {Object.keys(getListFiturResult).map((key) => (
                                <option value={key} key={key}>
                                  {getListFiturResult[key].namaFitur}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Tagihan (Rp.)</label>
                            <Input
                              type="number"
                              value={tagihan}
                              name="tagihan"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>nop</label>
                            <Input
                              type="number"
                              value={nop}
                              name="nop"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>alamat</label>
                            <Input
                              type="text"
                              value={alamat}
                              name="alamat"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>objek</label>
                            <Input
                              type="text"
                              value={objek}
                              name="objek"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>estimasi</label>
                            <Input
                              type="text"
                              value={estimasi}
                              name="estimasi"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>tempo</label>
                            <Input
                              type="text"
                              value={tempo}
                              name="tempo"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Jenis</label>
                            <Input
                              type="text"
                              value={jenis}
                              name="jenis"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <label>Tahun</label>
                          <FormGroup check>
                            {tahuns.map((tahun, index) => (
                              <Label key={index} check className="mr-2">
                                <Input
                                  type="checkbox"
                                  value={tahun}
                                  onChange={(event) => this.handleCheck(event)}
                                />
                                {tahun}
                                <span className="form-check-sign">
                                  <span className="check"></span>
                                </span>
                              </Label>
                            ))}
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Status</label>
                            <Input
                              type="select"
                              name="ready"
                              value={ready}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value={false}>Belum Lunas</option>
                              <option value={true}>lunas</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {tambahPbbLoading ? (
                        <Button
                          type="submit"
                          color="primary"
                          className="float-right"
                          disabled
                        >
                          <Spinner size="sm" color="light" /> Loading . . .
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          color="primary"
                          className="float-right"
                        >
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
  getListFiturLoading: state.FiturReducer.getListFiturLoading,
  getListFiturResult: state.FiturReducer.getListFiturResult,
  getListFiturError: state.FiturReducer.getListFiturError,

  updatePbbLoading: state.PbbReducer.updatePbbLoading,
  updatePbbResult: state.PbbReducer.updatePbbResult,
  updatePbbError: state.PbbReducer.updatePbbError,

  tambahPbbLoading: state.PbbReducer.tambahPbbLoading,
  tambahPbbResult: state.PbbReducer.tambahPbbResult,
  tambahPbbError: state.PbbReducer.tambahPbbError,
});

export default connect(mapStateToProps, null)(TambahPbb);
