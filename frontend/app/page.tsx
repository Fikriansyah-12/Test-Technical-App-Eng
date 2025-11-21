'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Table, Input, Layout, Avatar, Typography, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Header, Content } = Layout;
const { Title } = Typography;

type RandomUser = {
  name: string;
  location: string;
  email: string;
  age: number;
  phone: string;
  cell: string;
  picture: string[];
};

type ApiResponse = {
  count: number;
  users: RandomUser[];
};

export default function RandomUserPage() {
  const [users, setUsers] = useState<RandomUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/random-user/fetch?results=10&page=1`,
      );

      if (!res.ok) {
        console.error('Failed:', res.status, await res.text());
        return;
      }

      const data: ApiResponse = await res.json();
      setUsers(data.users);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);


  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;

    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.toLowerCase().includes(q) ||
        u.location.toLowerCase().includes(q),
    );
  }, [users, search]);

  const columns: ColumnsType<RandomUser & { key: number }> = [
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Umur',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: 'Alamat',
      dataIndex: 'location',
      key: 'location',
      ellipsis: true,
    },
        {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'No Telepon 1',
      dataIndex: 'phone',
      key: 'phone',
      ellipsis: true,
    },
    {
      title: 'No Telepon 2',
      dataIndex: 'cell',
      key: 'cell',
      ellipsis: true,
    },
     {
  title: 'Gambar',
  dataIndex: 'picture',
  key: 'picture',
  render: (_value, record) => (
    <Space>
      <Avatar shape='square' src={record.picture?.[0]} size={64} /> 
    </Space>
  ),
},

  ];

  const dataSource = filteredUsers.map((u, index) => ({
    key: index,
    ...u,
  }));

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          padding: '0 24px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Space
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Random User List
          </Title>

          <Input
            placeholder="Search by name, email, phone, location"
            allowClear
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 320 }}
          />
        </Space>
      </Header>

      <Content style={{ padding: 24 }}>
        <Table
          rowKey={(record) => record.name + record.email}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={{ pageSize: 10 }}
          bordered
        />
        
      </Content>
    </Layout>
  );
}
