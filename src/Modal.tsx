import React, { useState } from 'react';
import { Modal as MuiModal, Box, TextField, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    onGenerate: (inputValue: string) => void;
  }

const validationSchema = yup.object({
  prompt: yup.string().required('Prompt is required'),
});

const CustomModal: React.FC<ModalProps> = ({ open, onClose, title, onGenerate }) => {
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [showHello, setShowHello] = useState<boolean>(false); 
  const [showGenerating, setShowGenerating] = useState<boolean>(false); 
  const [showButtons, setShowButtons] = useState<'generate' | 'insert-regenerate'>('generate'); 

  const formik = useFormik({
    initialValues: {
      prompt: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setGeneratedPrompt(values.prompt);
      onGenerate(values.prompt);
      formik.resetForm();

      setShowGenerating(true);
      setShowHello(false);

      setTimeout(() => {
        setShowGenerating(false); 
        setShowHello(true); 
        setShowButtons('insert-regenerate'); 
      }, 3000);
    },
  });

  return (
    <MuiModal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: 'white',
          borderRadius: 2,
          width: '90%',
          maxWidth: '500px',
          mx: 'auto',
          mt: '10vh',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <Typography variant="h6" mb={2}>
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
          {generatedPrompt && (
            <Typography
              variant="body1"
              sx={{
                bgcolor: '#e0f7fa',
                borderRadius: '10px',
                padding: '10px',
                maxWidth: '80%',
                textAlign: 'right',
                alignSelf: 'flex-end', 
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              {generatedPrompt}
            </Typography>
          )}

          {showGenerating ? (
            <Typography
              variant="body1"
              sx={{
                bgcolor: '#fce4ec',
                borderRadius: '10px',
                padding: '10px',
                maxWidth: '80%',
                textAlign: 'left',
                alignSelf: 'flex-start', 
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              Generating...
            </Typography>
          ) : showHello ? (
            <Typography
              variant="body1"
              sx={{
                bgcolor: '#fce4ec',
                borderRadius: '10px',
                padding: '10px',
                maxWidth: '80%',
                textAlign: 'left',
                alignSelf: 'flex-start', 
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.
            </Typography>
          ) : null}
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="prompt"
            name="prompt"
            label="Enter your prompt"
            value={formik.values.prompt}
            onChange={formik.handleChange}
            error={formik.touched.prompt && Boolean(formik.errors.prompt)}
            helperText={
              formik.touched.prompt && typeof formik.errors.prompt === 'string'
                ? formik.errors.prompt
                : ''
            }
          />
          
          {showButtons === 'generate' ? (
    
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(45deg, #FE6B8C 30%, #FF8E53 90%)',
                color: 'white',
                textTransform: 'none',
                fontWeight: 'bold',
                '& .MuiButton-startIcon': {
                  marginRight: 1,
                },
                '&:hover': {
                  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                  opacity: 0.85,
                },
              }}
              startIcon={<SendIcon />}
            >
              Generate
            </Button>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                color="success"
                variant="contained"
                fullWidth
                onClick={() => {
                    const linkedinInput = document.querySelector('.msg-form__contenteditable');
                    const pTag = linkedinInput?.querySelector('p');

                    if (pTag) {
                    pTag.textContent = 'Thank you for the opportunity! Feel free to ask more questions.';
                    const event = new Event('input', {
                        bubbles: true,
                        cancelable: true,
                    });
                    linkedinInput.dispatchEvent(event);
                    formik.setFieldValue('prompt', '');
                    formik.setTouched({ prompt: false });
                    setShowButtons('generate');
                    onClose();
                    }
                }}
                sx={{
                    backgroundColor: '#4caf50',
                    '&:hover': {
                    backgroundColor: '#43a047',
                    },
                }}
                >
                Insert
                </Button>

              <Button
                color="secondary"
                variant="contained"
                fullWidth
                onClick={() => setShowButtons('generate')} 
                sx={{
                  backgroundColor: '#f50057',
                  '&:hover': {
                    backgroundColor: '#c51162',
                  },
                }}
              >
                Regenerate
              </Button>
            </Box>
          )}
        </form>
      </Box>
    </MuiModal>
  );
};

export default CustomModal;
