import {
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
    Box,
    Container,
    DialogContentText,
    Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FilterButton from '../components/FilterButton';
import Card from '../components/Card';

const FormFields = ({
    Title,
    setTitle,
    Location,
    setLocation,
    User,
    setUser,
}: {
    Title: string,
    setTitle: (title: string) => void,
    Location: string,
    setLocation: (location: string) => void,
    User: string,
    setUser: (user: string) => void,
}) => {
    return (
        <FormControl sx={{}}>
            <TextField
                sx={{ mt: 4 }}
                className="input-box"
                label="Title"
                value={Title}
                onChange={e => setTitle(e.target.value)}
            />
            <TextField
                sx={{ mt: 4 }}
                className="input-box"
                label="Location"
                value={Location}
                onChange={e => setLocation(e.target.value)}
            />
            <TextField
                sx={{ mt: 4 }}
                className="input-box"
                label="User"
                value={User}
                onChange={e => setUser(e.target.value)}
            />
        </FormControl>
    );
};

const Browse = (props: { username: string }) => {
    // Submit Tutorial
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [Title, setTitle] = useState('');
    const [Location, setLocation] = useState('');
    const [User, setUser] = useState('');

    useEffect(() => {
        if (props.username === "" || props.username === undefined) {
            navigate("/login");
        }
    }, [props.username, navigate]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:8000/api/tutorials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                Title,
                Location,
                User,
            }),
        });

        const data = await response.json();
        setOpen(false);
    };

    // Filters
    const [language, setLanguage] = useState("All Languages");
    const [technology, setTechnology] = useState("All Technologies");
    const [difficulty, setDifficulty] = useState("All Skill Levels");
    const [learningStyle, setLearningStyle] = useState("All Learning Styles");

    const handleDifficultyChange = (value: string) => {
        setDifficulty(value);
    };
    const handleLanguageChange = (value: string) => {
        setLanguage(value);
    };
    const handleTechnologyChange = (value: string) => {
        setTechnology(value);
    };
    const handleLearningStyleChange = (value: string) => {
        setLearningStyle(value);
    };

    // Tutorials
    const [tutorials, setTutorials] = useState([]);

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/tutorials', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                })
                const data = await response.json();

                const tutorialData = data.map((item: { title: string, location: string, score: number, }) =>
                    item);
                setTutorials(tutorialData);
            }
        )();
    }, [props.username]);

    const tutorialCards = tutorials.map((item: { title: string, location: string, score: number }) => {
        return <Card title={item.title} location={item.location} likes={item.score} />
    })

    return (
        <Container maxWidth={false} sx={{
            minHeight: "60vh",
        }}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                paddingTop="3%"
                marginX={10}
            >
                <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center", fontSize: 35, }}>
                    Browse Tutorials
                </Typography>
                <Button variant="contained" sx={{
                    ml: 'auto',
                    backgroundColor: "#0097b2",
                    '&:hover': {
                        backgroundColor: "#028299",
                    },
                }} onClick={() => setOpen(true)}>
                    SUBMIT TUTORIAL
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ fontSize: 20, textAlign: 'center' }}>Submit a Tutorial</DialogTitle>
                <DialogContent>
                    <DialogContentText>Find a great tutorial? Enter the details below!</DialogContentText>
                    <FormFields
                        Title={Title}
                        setTitle={setTitle}
                        Location={Location}
                        setLocation={setLocation}
                        User={User}
                        setUser={setUser}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{
                        color: "#0097b2",
                    }}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" sx={{
                        backgroundColor: "#0097b2",
                        '&:hover': {
                            backgroundColor: "#028299",
                        },
                    }}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <Box sx={{ display: 'flex', ml: '5%', my: 2, mb: 3, width: 200 }}>
                <Box sx={{ flex: 1 }}>
                    <FilterButton
                        defaultOption='All Languages'
                        options={['Assembly', 'Bash/Shell', 'C', 'C#', 'C++', 'COBOL', 'Dart', 'Elixir', 'F#', 'Fortran', 'Go', 'Groovy', 'Haskell', 'HTML/CSS', 'Java', 'JavaScript', 'Julia', 'Kotlin', 'Lua', 'MATLAB', 'OCaml', 'Perl', 'PHP', 'PowerShell', 'Python', 'R', 'Ruby', 'Rust', 'Scala', 'SQL', 'Swift', 'TypeScript', 'VBA']}
                        value={language}
                        onChange={handleLanguageChange}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <FilterButton
                        defaultOption="All Technologies"
                        options={['.NET', 'Angular', 'Angular.js', 'Ansible', 'ASP.NET', 'Blazor', 'Cloud Computing', 'CouchDB', 'Django', 'Docker', 'DynamoDB', 'Express', 'FastAPI', 'Flask', 'Flutter', 'Git', 'GitHub', 'GitLab', 'Homebrew', 'jQuery', 'Kubernetes', 'Laravel', 'MariaDB', 'Microsoft SQL Server', 'MongoDB', 'MySQL', 'Next.js', 'Node.js', 'npm', 'NumPy', 'Nuxt.js', 'Oracle', 'Pandas', 'PostgreSQL', 'PyTorch', 'Qt', 'React Native', 'React.js', 'Redis', 'Ruby on Rails', 'SQLite', 'Spring', 'Svelte', 'Terraform', 'TensorFlow', 'Unity 3D', 'Unreal Engine', 'Vue.js', 'Yarn']}
                        value={technology}
                        onChange={handleTechnologyChange}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <FilterButton
                        defaultOption="All Skill Levels"
                        options={['Beginner', 'Intermediate', 'Advanced']}
                        value={difficulty}
                        onChange={handleDifficultyChange}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <FilterButton
                        defaultOption="All Learning Styles"
                        options={['Text Tutorials', 'Video Tutorials', 'Interactive Tutorials']}
                        value={learningStyle}
                        onChange={handleLearningStyleChange}
                    />
                </Box>
            </Box>
            <Grid container spacing={2} sx={{ justifyContent: 'space-around', display: 'flex', flexWrap: 'wrap' }}>
                {tutorialCards}
            </Grid>
        </Container>
    );
}
export default Browse;
