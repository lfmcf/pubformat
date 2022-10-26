import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Button, TextField } from '@mui/material';
import { useForm } from '@inertiajs/inertia-react';

const Create = (props) => {

    
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        name:''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('teams.store'));
    }

    return(
        <Authenticated auth={props.auth} header="Create team">
            <div>
                <form onSubmit={handleSubmit}>
                    <TextField type="text" name="name" onChange={(e) => setData('name', e.target.value)} />
                    <Button type='submit'>Save</Button>
                </form>
            </div>
        </Authenticated>
    )
}

export default Create;