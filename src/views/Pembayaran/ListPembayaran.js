import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Spinner,
} from "reactstrap";
import { getListPembayaran } from "actions/PembayaranAction";
import { numberWithCommas } from "utils";
import { Pembayaran } from "components";

class ListPembayaran extends Component {
  componentDidMount() {
    this.props.dispatch(getListPembayaran());
  }

  render() {
    const {
      getListPembayaranError,
      getListPembayaranLoading,
      getListPembayaranResult,
    } = this.props;
    console.log("bayar", getListPembayaranResult);
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Pembayaran</CardTitle>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Tanggal & Order ID</th>
                      <th>Pembayaran</th>
                      <th>Status</th>
                      <th>Total Harga</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getListPembayaranResult ? (
                      Object.keys(getListPembayaranResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <p>{getListPembayaranResult[key].tanggal}</p>
                            <p>({getListPembayaranResult[key].order_id})</p>
                          </td>
                          <td>
                            <Pembayaran
                              pesanans={getListPembayaranResult[key].pesanans}
                            />
                          </td>
                          <td>{getListPembayaranResult[key].status}</td>
                          <td align="right">
                            <p>
                              Total Harga : Rp.{" "}
                              {numberWithCommas(
                                getListPembayaranResult[key].totalHarga
                              )}
                            </p>

                            <p>
                              Ongkir : Rp.{" "}
                              {numberWithCommas(
                                getListPembayaranResult[key].ongkir
                              )}
                            </p>

                            <p>
                              <strong>
                                Total : Rp.{" "}
                                {numberWithCommas(
                                  getListPembayaranResult[key].totalHarga +
                                    getListPembayaranResult[key].ongkir
                                )}
                              </strong>
                            </p>
                          </td>
                          <td>
                            <a
                              href={getListPembayaranResult[key].url}
                              className="btn btn-primary"
                              target="_blank"
                            >
                              <i className="nc-icon nc-money-coins"></i>{" "}
                              Midtrans
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : getListPembayaranLoading ? (
                      <tr>
                        <td colSpan="6" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListPembayaranError ? (
                      <tr>
                        <td colSpan="6" align="center">
                          {getListPembayaranError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="6" align="center">
                          Data Kosong
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getListPembayaranLoading: state.PembayaranReducer.getListPembayaranLoading,
  getListPembayaranResult: state.PembayaranReducer.getListPembayaranResult,
  getListPembayaranError: state.PembayaranReducer.getListPembayaranError,
});

export default connect(mapStateToProps, null)(ListPembayaran);
