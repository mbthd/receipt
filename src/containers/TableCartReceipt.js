import React from "react";
import { connect } from "react-redux";
import { removeFromCart } from "../actions";
import { getCartProductsFromReceipt } from "../reducers/receipts";
import * as Table from "reactabular-table";

class TableCartReceipt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns()
    };
  }

  getColumns() {
    return [
      {
        property: "title",
        header: {
          label: "Title"
        },
        props: {
          style: { minWidth: 175, width: 175 }
        }
      },
      {
        property: "price",
        header: {
          label: "Price"
        },
        props: {
          style: { minWidth: 40, width: 40 }
        }
      },
      {
        property: "quantity",
        header: {
          label: "Quantity"
        },
        props: {
          style: { minWidth: 70, width: 70 }
        }
      }
    ];
  }

  render() {
    const { rows } = this.props;
    const { columns } = this.state;

    const hasRows = rows.length > 0;
    if (!hasRows) {
      return null;
    }

    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        columns={columns}
      >
        <Table.Header />
        <Table.Body rows={rows} rowKey="id" />
      </Table.Provider>
    );
  }
}

const mapStateToProps = state => ({
  rows: getCartProductsFromReceipt(state)
});

export default connect(
  mapStateToProps,
  { removeFromCart }
)(TableCartReceipt);
