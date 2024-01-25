'use client'
import {Button, Col, Form, Input, message, Row} from "antd";
import SortFilter from "@/Components/SortFilter";
import {SortIcon} from "@/Utils/svg";
import {useEffect, useState} from "react";
import {API_MANAGER} from "@/API";
import HELPERS from "@/Utils/helpers";

const sortFields = [
    {
        label: "Stars",
        name: "stargazers_count"
    },
    {
        label: "Watchers Count",
        name: "watchers_count"
    },
    {
        label: "Score",
        name: "score"
    },
    {
        label: "Name",
        name: "full_name"
    },
    {
        label: "Created At",
        name: "created_at"
    },
    {
        label: "Updated At",
        name: "updated_at"
    },
]

export default function Home() {
    const [showSortPopup, setShowSortPopup] = useState(false)
    const [sortFilterVal, setSortFilterVal] = useState({field: null, dir: null})
    const [repoList, setRepoList] = useState([])
    const [searchForm] = Form.useForm()

    useEffect(() => {
        if (repoList?.length > 0) {
            // getRepos()
            const sortedData = HELPERS.sortData(repoList, sortFilterVal?.field, sortFilterVal?.dir)
            setRepoList(sortedData)
        }
    }, [sortFilterVal])

    const getRepos = async () => {
        const params = {
            q: searchForm.getFieldValue('query'),
            sort: sortFilterVal?.field,
            order: sortFilterVal?.dir,
        }
        try {
            const response = await API_MANAGER.getRepos(params)
            setRepoList(response?.data?.items)
        } catch (err) {
            message.warning('Something went wrong')
        }
    }

    return (
        <div className={'layout-main'}>
            <Row className={'action-main'} gutter={16}>
                <Col className={'input-container'}>
                    <Form
                        layout={'vertical'}
                        form={searchForm}
                    >
                        <Form.Item
                            label={'Enter Search String'}
                            name='query'
                        >
                            <Input
                                onPressEnter={getRepos}
                            />
                        </Form.Item>
                    </Form>
                </Col>
                <Col className={'filter-container d-flex align-items-bottom hover-pointer'}>
                    <SortFilter
                        fields={sortFields}
                        showPopup={showSortPopup}
                        setShowPopup={setShowSortPopup}
                        buttonClassName={"sort-filter-icon-button"}
                        setSortFilterVal={setSortFilterVal}
                    >
                        <Button className={'flex-center'}>
                            <SortIcon
                                className={"get-hover sort-filter-icon-button"}
                                onClick={() => setShowSortPopup(!showSortPopup)}
                            />
                        </Button>
                    </SortFilter>
                </Col>
            </Row>
            <Row className={'content-main'} gutter={[24, 24]}>
                {repoList?.map(item => (
                    <Col lg={8} md={12} xs={24} key={item?.id}>
                        <div className={'d-flex card-main align-items-center'}>
                            <div className={'img-container'}>
                                <img src={item?.owner?.avatar_url} alt={'avatar'}/>
                            </div>
                            <div className={'content-main'}>
                                <div className={'content'}>
                                    <span className={'heading'}>Repo name: </span>
                                    <span>{item?.full_name}</span>
                                </div>
                                <div className={'content'}>
                                    <span className={'heading'}>Stars: </span>
                                    <span>{item?.stargazers_count}</span>
                                </div>
                                <div className={'content'}>
                                    <span className={'heading'}>Description: </span>
                                    <span>{item?.description}</span>
                                </div>
                                <div className={'content'}>
                                    <span className={'heading'}>Language: </span>
                                    <span>{item?.language}</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
