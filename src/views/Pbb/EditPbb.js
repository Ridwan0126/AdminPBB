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
import { getDetailPbb, updatePbb, uploadPbb } from "../../actions/PBBAction";
import { getListFitur } from "../../actions/FiturAction";

class EditPbb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
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
      edittahun: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getListFitur());
    this.props.dispatch(getDetailPbb(this.props.match.params.id));
  }

  componentDidUpdate(prevProps) {
    const { uploadPbbResult, updatePbbResult, getDetailPbbResult } = this.props;

    if (uploadPbbResult && prevProps.uploadPbbResult !== uploadPbbResult) {
      this.setState({
        [uploadPbbResult.imageToDB]: uploadPbbResult.image,
      });

      swal("Sukses", "Gambar Berhasil di Upload", "success");
    }

    if (updatePbbResult && prevProps.updatePbbResult !== updatePbbResult) {
      swal("Sukses", updatePbbResult, "success");
      this.props.history.push("/admin/Pbb");
    }

    if (
      getDetailPbbResult &&
      prevProps.getDetailPbbResult !== getDetailPbbResult
    ) {
      this.setState({
        nama: getDetailPbbResult.nama,
        tagihan: getDetailPbbResult.tagihan,
        nop: getDetailPbbResult.nop,
        jenis: getDetailPbbResult.jenis,
        tahunSelected: getDetailPbbResult.tahun,
        ready: getDetailPbbResult.ready,
        Fitur: getDetailPbbResult.Fitur,
        alamat: getDetailPbbResult.alamat,
        objek: getDetailPbbResult.objek,
        estimasi: getDetailPbbResult.estimasi,
        tempo: getDetailPbbResult.tempo,
      });
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

      this.props.dispatch(uploadPbb(gambar, imageToDB));
    }
  };

  handleSubmit = (event) => {
    const { nop, tagihan, nama, Fitur, tahunSelected, jenis } = this.state;

    event.preventDefault();

    if (nama && Fitur && tagihan && nop && tahunSelected && jenis) {
      //action
      this.props.dispatch(updatePbb(this.state));
    } else {
      swal("Failed", "Maaf semua form wajib diisi", "error");
    }
  };

  edittahun = () => {
    this.setState({
      edittahun: true,
      tahunSelected: [],
    });
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
      editTahun,
    } = this.state;
    const { getListFiturResult, updatePbbLoading } = this.props;

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
              <CardHeader tag="h4">Edit Pbb</CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Pbb</label>
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
                            <label>tagihan (Rp.)</label>
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
                            <label>nop (kg)</label>
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
                            <label>Jenis</label>
                            <Input
                              type="text"
                              value={jenis}
                              name="jenis"
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
                      </Row>

                      <Row>
                        <Col md={6}>
                          <label>
                            tahun Yang Tersedia Sekarang : (
                            {tahuns.map((item, index) => (
                              <strong key={index}> {item} </strong>
                            ))}
                            )
                          </label>
                          {editTahun ? (
                            <>
                              <FormGroup check>
                                {tahuns.map((tahun, index) => (
                                  <Label key={index} check className="mr-2">
                                    <Input
                                      type="checkbox"
                                      value={tahun}
                                      onChange={(event) =>
                                        this.handleCheck(event)
                                      }
                                    />
                                    {tahun}
                                    <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                ))}
                              </FormGroup>
                              <Button
                                color="primary"
                                size="sm"
                                onClick={() =>
                                  this.setState({ edittahun: false })
                                }
                              >
                                Selesai Edit tahun
                              </Button>
                            </>
                          ) : (
                            <Button
                              color="primary"
                              size="sm"
                              onClick={() => this.edittahun()}
                            >
                              Edit tahun
                            </Button>
                          )}
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Ready</label>
                            <Input
                              type="select"
                              name="ready"
                              value={ready}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value={true}>Ada</option>
                              <option value={false}>Kosong</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {updatePbbLoading ? (
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

  uploadPbbLoading: state.PbbReducer.uploadPbbLoading,
  uploadPbbResult: state.PbbReducer.uploadPbbResult,
  uploadPbbError: state.PbbReducer.uploadPbbError,

  getDetailPbbLoading: state.PbbReducer.getDetailPbbLoading,
  getDetailPbbResult: state.PbbReducer.getDetailPbbResult,
  getDetailPbbError: state.PbbReducer.getDetailPbbError,

  updatePbbLoading: state.PbbReducer.updatePbbLoading,
  updatePbbResult: state.PbbReducer.updatePbbResult,
  updatePbbError: state.PbbReducer.updatePbbError,
});

export default connect(mapStateToProps, null)(EditPbb);
