import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import { Button, Stack } from '@mui/material';

const Footer = () => {
    const handleLinkClick = (event) => {
        event.preventDefault();
        // Perform any necessary actions when a link is clicked
    };

    // skeleton effect
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Box
            sx={{
                fontSize: 10,
                marginTop: 1,
                backgroundColor: '#111111',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                '& > div': {
                    marginLeft: 'auto',
                },
                '& > div:last-child': {
                    marginRight: 'auto',
                },
            }}
        >
            <Stack direction="row" spacing={7}>
                <div>
                    {loading ? (
                        <Skeleton
                            variant="text"
                            animation="wave"
                            width="100%"
                            height={80}
                        />
                    ) : (
                        <Typography variant="body2" gutterBottom
                            sx={{
                                fontSize: 50,
                                fontStyle: 'normal',
                                fontWeight: 300,
                                lineHeight: 'normal',
                                color: '#FFF',
                                fontFamily: 'Noto Serif'
                            }}>
                            Don't Miss Out
                        </Typography>
                    )}
                    <br />
                    {loading ? (
                        <Skeleton
                            variant="text"
                            animation="wave"
                            width="100%"
                            height={80}
                        />
                    ) : (
                        <Typography variant="body2" gutterBottom
                            sx={{
                                fontSize: 30,
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                color: 'white',
                            }}>
                            Sign up for the latest beauty news, skincare tips and get appointment
                        </Typography>
                    )}
                    <br />
                    {loading ? (
                        <Skeleton
                            variant="text"
                            animation="wave"
                            width="100%"
                            height={80}
                        />
                    ) : (
                        <Button
                            sx={{
                                borderRadius: 30,
                                background: '#fff',
                                width: 294,
                                height: 62,
                                color: '#000',
                                fontSize: 20,
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: 'normal',
                                ":hover": { background: 'grey' }
                            }}>
                            Sign up
                        </Button>
                    )}
                    <br />
                    <br />
                    <br />
                    {loading ? (
                        <Skeleton
                            variant="text"
                            animation="wave"
                            width="100%"
                            height={80}
                        />
                    ) : (
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 30,
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                color: 'white',
                            }}
                        >
                            Skinsense AI is not intended to perform diagnosis, but rather to provide users the ability to image, track, and better understand their acne.
                            <br />
                            <br />
                            SkinsenseAI | All Rights Reserved. © 2023
                        </Typography>
                    )}
                </div>

                <div>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: 35,
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: 'normal',
                            color: 'white',
                        }}
                    >
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width="70%" height={32} />
                        ) : (
                            <Link
                                href="#"
                                onClick={handleLinkClick}
                                sx={{
                                    color: 'white',
                                    textDecoration: 'none',
                                }}
                            >
                                Company
                            </Link>
                        )}
                    </Typography>
                    <br />
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: 30,
                            fontStyle: 'normal',
                            fontWeight: 300,
                            lineHeight: 'normal',
                        }}
                    >
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width="70%" height={32} />
                        ) : (
                            <Link
                                href='/'
                                sx={{
                                    color: '#FFF',
                                    textDecoration: 'none',
                                }}
                            >
                                Home
                            </Link>
                        )}
                    </Typography>
                    <br />
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: 30,
                            fontStyle: 'normal',
                            fontWeight: 300,
                            lineHeight: 'normal',
                            color: 'white',
                        }}
                    >
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width="70%" height={32} />
                        ) : (
                            <Link
                                href='/'
                                sx={{
                                    color: '#FFF',
                                    textDecoration: 'none',
                                }}
                            >
                                About us
                            </Link>
                        )}
                    </Typography>
                    <br />
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: 30,
                            fontStyle: 'normal',
                            fontWeight: 300,
                            lineHeight: 'normal',
                            color: 'white',
                        }}
                    >
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width="80%" height={32} />
                        ) : (
                            <Link
                                href="/"
                                sx={{
                                    color: '#FFF',
                                    textDecoration: 'none',
                                }}
                            >
                                How it works
                            </Link>
                        )}
                    </Typography>
                    <br />
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: 30,
                            fontStyle: 'normal',
                            fontWeight: 300,
                            lineHeight: 'normal',
                            color: 'white',
                        }}
                    >
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width="95%" height={32} />
                        ) : (
                            <Link
                                href="#"
                                onClick={handleLinkClick}
                                sx={{
                                    color: '#FFF',
                                    textDecoration: 'none',
                                }}
                            >
                                Artificial Intelligence
                            </Link>
                        )}
                        <br />
                        <br />
                        <br />
                    </Typography>
                    {loading ? (
                        <Skeleton
                            variant="text"
                            animation="wave"
                            width="100%"
                            height={143.107}
                        />
                    ) : (
                        <Box
                            component="img"
                            sx={{
                                height: 143.107,
                                width: 300,
                            }}
                            alt="The house from the offer."
                            src="https://cdn1.vieclam24h.vn/upload/files_cua_nguoi_dung/logo/2019/05/08/1557278478_Logo_i_hc_FPT.png"
                        />
                    )}
                </div>

                <div>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: 35,
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: 'normal',
                            color: 'white',
                        }}
                    >
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width="70%" height={32} />
                        ) : (
                            <Link
                                href="#"
                                onClick={handleLinkClick}
                                sx={{
                                    color: 'white',
                                    textDecoration: 'none',
                                }}
                            >
                                Service
                            </Link>
                        )}
                    </Typography>
                    <br />
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: 30,
                            fontStyle: 'normal',
                            fontWeight: 300,
                            lineHeight: 'normal',
                            color: 'white',
                        }}
                    >
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width="75%" height={32} />
                        ) : (
                            <Link
                                href="#"
                                sx={{
                                    color: '#FFF',
                                    textDecoration: 'none',
                                }}
                            >
                                Appointment
                            </Link>
                        )}
                    </Typography>
                    <br />
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: 30,
                            fontStyle: 'normal',
                            fontWeight: 300,
                            lineHeight: 'normal',
                            color: 'white',
                        }}
                    >
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width="85%" height={32} />
                        ) : (
                            <Link
                                href="#"
                                sx={{
                                    color: '#FFF',
                                    textDecoration: 'none',
                                }}
                            >
                                Check Your Skin
                            </Link>
                        )}
                    </Typography>
                </div>

                <div>
                    <div style={{ marginBottom: 135 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 35,
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: 'normal',
                                color: 'white',
                            }}
                        >
                            {loading ? (
                                <Skeleton variant="text" animation="wave" width="70%" height={32} />
                            ) : (
                                <Link
                                    href="#"
                                    onClick={handleLinkClick}
                                    sx={{
                                        color: 'white',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Need Help ?
                                </Link>
                            )}
                        </Typography>
                        <br />
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 30,
                                fontStyle: 'normal',
                                fontWeight: 300,
                                lineHeight: 'normal',
                                color: 'white',
                            }}
                        >
                            {loading ? (
                                <Skeleton variant="text" animation="wave" width="75%" height={32} />
                            ) : (
                                <Link
                                    href="#"
                                    onClick={handleLinkClick}
                                    sx={{
                                        color: '#FFF',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Features
                                </Link>
                            )}
                        </Typography>
                        <br />
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 30,
                                fontStyle: 'normal',
                                fontWeight: 300,
                                lineHeight: 'normal',
                                color: 'white',
                            }}
                        >
                            {loading ? (
                                <Skeleton variant="text" animation="wave" width="75%" height={32} />
                            ) : (
                                <Link
                                    href="#"
                                    onClick={handleLinkClick}
                                    sx={{
                                        color: '#FFF',
                                        textDecoration: 'none',
                                    }}
                                >
                                    FAQs
                                </Link>
                            )}
                        </Typography>
                        <br />
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 30,
                                fontStyle: 'normal',
                                fontWeight: 300,
                                lineHeight: 'normal',
                                color: 'white',
                            }}
                        >
                            {loading ? (
                                <Skeleton variant="text" animation="wave" width="85%" height={32} />
                            ) : (
                                <Link
                                    href="#"
                                    onClick={handleLinkClick}
                                    sx={{
                                        color: '#FFF',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Privacy Policy
                                </Link>
                            )}
                        </Typography>
                    </div>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: 26,
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            color: 'white',
                        }}
                    >
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width="100%" height={32} />
                        ) : (
                            <>
                                If you have any questions about our AI system, contact us via email:
                                <br />
                                <Link
                                    href="mailto:support@ai-derm.com"
                                    sx={{
                                        color: '#FFF',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    support@ai-derm.com
                                </Link>
                            </>
                        )}
                    </Typography>
                </div>
            </Stack>
        </Box >
    );
};

export default Footer;


