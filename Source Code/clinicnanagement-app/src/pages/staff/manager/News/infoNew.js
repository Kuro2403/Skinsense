import { useState, useEffect } from 'react';
import { Box, Button, FormControl, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { GetNewServices } from '../../../../api/newServices';

export default function InfoNews({ id, closeEvent }) {
    const [news, setNews] = useState({
        EmployeeID: '',
        NewsContext: '',
        NewImage: '',
        Title: ''
    });

    useEffect(() => {
        const getNews = async () => {
            const data = await GetNewServices(id);
            setNews({
                EmployeeID: data.employeeID,
                NewsContext: data.newsContext,
                NewImage: data.newImage,
                Title: data.title,
            });
        };
        getNews();
    }, [id]);

    const close = async () => {
        closeEvent();
    };


    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Edit news</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={news.Title}
                        name='Title'
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                        inputProps={{
                            style: {
                                pointerEvents: 'none',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <span>News context</span>
                    <FormControl
                        style={{
                            minWidth: '100%',
                            padding: '8px',
                            border: '1px solid rgba(0, 0, 0, 0.23)',
                            borderRadius: '4px',
                            resize: 'vertical',
                            outline: 'none',
                        }}
                    >
                        <textarea
                            disabled={true}
                            value={news.NewsContext}
                            name="NewsContext"
                            id="outlined-basic"
                            className={`MuiOutlinedInput-input MuiInputBase-input MuiInput-input MuiInputBase-inputMultiline`}
                            style={{
                                width: '100%',
                                padding: '6px 6px 6px 6px',
                                border: 'none',
                                resize: 'none',
                                outline: 'none',
                                fontSize: '17px'
                            }}
                            rows={10}
                        />
                    </FormControl>
                </Grid>
                <Grid align={'center'} item xs={12}>
                    <img
                        src={news.NewImage}
                        alt="Uploaded"
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5' align='center'>
                        <Button
                            variant='contained'
                            onClick={close}
                        >
                            Exit
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 2 }} />
        </>
    )
}
