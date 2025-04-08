import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Stack, Typography, Skeleton } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

const Body_content = () => {
    const navigate = useNavigate();
    // skeleton effect
    const [loading, setLoading] = useState(true);
    const [codeNotMach, setCodeNotMach] = useState(false);
    const [verificationCodes, setVerificationCodes] = useState(['', '', '', '']);
    const [verificationError, setVerificationError] = useState('');

    useEffect(() => {
        // Simulating loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleVerifyClick = () => {
        const codeRegex = /^\d{1}$/; // Regular expression for a single digit

        if (verificationCodes.every(code => code.match(codeRegex))) {
            const codeAccept = verificationCodes[0] + verificationCodes[1] + verificationCodes[2] + verificationCodes[3];
            const code = localStorage.getItem('codeForgotPassword');
            if (codeAccept === code.toString()) {
                setCodeNotMach(false);
                navigate("/ForgotPass3");
            }
            else {
                setCodeNotMach(true)
            }
        } else {
            setVerificationError('Please enter a valid verify code!');
        }
    };

    const handleCodeChange = (index, value) => {
        const updatedCodes = [...verificationCodes];
        updatedCodes[index] = value;
        setVerificationCodes(updatedCodes);
        setVerificationError(''); // Clear error message when user starts typing
    };

    return (
        <Box>
            <Stack direction="row"
                sx={{
                    marginLeft: 18,
                    marginRight: 32,
                    marginTop: 5.75,
                    marginBottom: 6.5
                }}>
                <Paper sx={{ boxShadow: 'none', marginBottom: 32 }}>
                    <Typography
                        sx={{
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                        }}>
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={'100%'} />
                        ) : (
                            "Enter a verify code"
                        )}
                    </Typography>
                    <br />
                    <Typography
                        sx={{
                            fontSize: 20,
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                        }}>
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={'100%'} />
                        ) : (
                            "After you have checked your email, get the code that has been sent to your mailbox to enter below, then click VERIFY to be able to confirm the information successfully."
                        )}
                    </Typography>
                    <Stack
                        sx={{
                            marginTop: 19.5,
                            marginLeft: '600px',
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 'fit-content'
                        }}>
                        <Stack direction={'row'} spacing={2}>
                            {loading ? (
                                <>
                                    <Skeleton variant="text" animation="wave" width={99} height={56} />
                                    <Skeleton variant="text" animation="wave" width={99} height={56} />
                                    <Skeleton variant="text" animation="wave" width={99} height={56} />
                                    <Skeleton variant="text" animation="wave" width={99} height={56} />
                                </>
                            ) : (
                                verificationCodes.map((code, index) => (
                                    <TextField
                                        key={index}
                                        className="inputRounded1"
                                        placeholder='_'
                                        inputProps={{
                                            style: {
                                                textAlign: 'center'
                                            }
                                        }}
                                        value={code}
                                        onChange={(e) => handleCodeChange(index, e.target.value)}
                                    />
                                ))
                            )}
                        </Stack>
                        {verificationError && (
                            <Typography color="error">{verificationError}</Typography>
                        )}
                        {
                            codeNotMach && (
                                <Typography color="error">The code does not match the code in the email!</Typography>
                            )
                        }
                        <br />
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={144} height={50} />
                        ) : (
                            <Button
                                onClick={handleVerifyClick}
                                variant="contained"
                                sx={{
                                    backgroundColor: 'black',
                                    width: 144,
                                    height: 50,
                                    borderRadius: 30,
                                    ":hover": { background: 'gray' }
                                }}>
                                Verify
                            </Button>
                        )}
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    )
}

export default Body_content;