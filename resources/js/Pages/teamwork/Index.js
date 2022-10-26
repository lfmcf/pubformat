import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';

const Index = (props) => {
    
    return (
        <Authenticated auth={props.auth} header="Teams">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading clearfix">
                                Teams
                                <a className="pull-right btn btn-default btn-sm" href={route('teams.create')}>
                                    <i className="fa fa-plus"></i> Create team
                                </a>
                            </div>
                            <div className="panel-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.teams.map(team => (
                                            <tr key={team.id}>
                                                <td>
                                                    {team.name}
                                                </td>
                                                <td>
                                                    {team.status ? 'owner' : 'member'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}

export default Index;