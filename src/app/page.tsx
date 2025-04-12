"use client";
import { useAdvocateSearch } from "@/hooks/useAdvocateSearch";
import { useEffect } from "react";
import { Divider, Input, Space, Table } from "antd";

export default function Home() {
  const { searchTerm, advocates, setSearchTerm, fetchAdvocates } =
    useAdvocateSearch();

  useEffect(() => {
    console.log("fetching advocates...");
    fetchAdvocates(searchTerm);
  }, [searchTerm, fetchAdvocates]);

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <main className='my-4'>
      <h1 className='mx-4'>Solace Advocates</h1>
      <div className='sticky top-0 z-10 bg-white py-4 px-4 shadow-md'>
        <Divider orientation='left'>Search</Divider>
        <Space direction='horizontal'>
          <Input.Search
            allowClear
            value={searchTerm}
            onChange={onSearchInputChange}
            placeholder='Search advocates...'
          />
          <span> {`${advocates.length} results`} </span>
        </Space>
      </div>
      <Table
        dataSource={advocates}
        columns={columns}
        pagination={{ position: ["topRight"] }}
      />
    </main>
  );
}

const columns = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Degree",
    dataIndex: "degree",
    key: "degree",
  },
  {
    title: "Specialties",
    dataIndex: "specialties",
    key: "specialties",
    render: (specialties: string[]) => (
      <>
        {specialties.map((specialty) => (
          <div key={specialty}>{specialty}</div>
        ))}
      </>
    ),
  },
  {
    title: "Years of Experience",
    dataIndex: "yearsOfExperience",
    key: "yearsOfExperience",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
];
