import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {NavLink} from "react-router-dom";
import {fatchTopList, setClientLoad} from "../redux/actions";
import ListItem from "../components/ListItem";
import "../assets/top-list.styl";
import {useDispatch, useSelector} from "react-redux";


function TopList({match}) {
    const {topList, clientShouldLoad} = useSelector((state) => ({
        clientShouldLoad: state.clientShouldLoad,
        topList: state.topList
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        // 判断是否需要加载数据
        if (clientShouldLoad === true) {
            dispatch(fatchTopList());
        } else {
            // 客户端执行后，将客户端是否加载数据设置为true
            dispatch(setClientLoad(true));
        }
    }, [])

    return (
        <div>
            <Helmet>
                <title>Top List</title>
            </Helmet>
            <ul className="list-wrapper">
                {
                    topList.map(item => {
                        return <li className="list-item" key={item.id}>
                            <NavLink to={`${match.url}/${item.id}`}><ListItem {...item} /></NavLink>
                        </li>;
                    })
                }
            </ul>
        </div>
    )
}

export default TopList;