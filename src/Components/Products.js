import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import axios from "axios";
import { Errors } from "../Context";

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]);
  const searchInput = useRef(null);
  const { newError } = useContext(Errors);

  useEffect(() => {
    axios
      .get("/variations")
      .then((res) => {
        setData(res.data.items);
      })
      .catch(() => {
        newError("SomeThing went wrong, please retry again...");
      });
  }, [newError]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "productName",
      key: "productName",
      ...getColumnSearchProps("productName"),
      sorter: (a, b) => a.productName.length - b.productName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
      ...getColumnSearchProps("barcode"),
      sorter: (a, b) => a.barcode - b.barcode,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Description",
      dataIndex: "shortDescription",
      key: "shortDescription",
      ...getColumnSearchProps("shortDescription"),
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
      sorter: (a, b) => a.supplier.length - b.supplier.length,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("supplier"),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      ...getColumnSearchProps("sku"),
    },
  ];
  return (
    <div className="products-table">
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Products;
