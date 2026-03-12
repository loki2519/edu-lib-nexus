import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { mockStudents } from "@/lib/mockData";

const RegisteredUsers = () => (
  <div className="animate-fade-in">
    <PageHeader title="Registered Users" description="RFID registered library users" />
    <DataTable
      columns={[
        { header: "Student ID", accessor: "id" },
        { header: "Name", accessor: "name" },
        { header: "Department", accessor: "department" },
        { header: "Semester", accessor: "semester" },
        { header: "RFID Card", accessor: "rfidCard" },
        { header: "Email", accessor: "email" },
      ]}
      data={mockStudents}
    />
  </div>
);

export default RegisteredUsers;
