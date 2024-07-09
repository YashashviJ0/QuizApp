import React, { useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getAllReportsByUser } from "../../../apicalls/reports";
import moment from "moment";

function UserReports() {
    const [reportsData, setReportsData] = React.useState([]);
    const dispatch = useDispatch();

    const columns = [
        {
            title: "Exam Name",
            dataIndex: "examName",
            render: (text, record) => <>{record.exam?.name || 'N/A'}</>,
        },
        {
            title: "Date",
            dataIndex: "date",
            render: (text, record) => (
                <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
            ),
        },
        {
            title: "Total Marks",
            dataIndex: "totalQuestions",
            render: (text, record) => <>{record.exam?.totalMarks || 'N/A'}</>,
        },
        {
            title: "Passing Marks",
            dataIndex: "correctAnswers",
            render: (text, record) => <>{record.exam?.passingMarks || 'N/A'}</>,
        },
        {
            title: "Obtained Marks",
            dataIndex: "correctAnswers",
            render: (text, record) => <>{record.result?.correctAnswers.length || 'N/A'}</>,
        },
        {
            title: "Verdict",
            dataIndex: "verdict",
            render: (text, record) => <>{record.result?.verdict || 'N/A'}</>,
        },
    ];

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllReportsByUser();
            if (response.success) {
                setReportsData(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <PageTitle title="Reports" />
            <div className="divider"></div>
            <Table columns={columns} dataSource={reportsData} />
        </div>
    );
}

export default UserReports;