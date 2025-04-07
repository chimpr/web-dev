import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import './style/JobSkillsWidget.css'


export default function JobSkillsWidget(props: any) {
   
    const [skills, setSkills] = useState<string[]>([...props.skills]);
    const skillsEditable = props.skillsEditable;
    const [showSkillExists, setShowSkillExists] = useState(false);
    const [skillText, setSkillText] = useState('');

    useEffect(() => {
        // update the skills
        if (skillsEditable)
            props.setSkills(skills);
    }, [skills])

    const handleAddSkillBtnClick = () => {
        const txt = skillText.trim().toLocaleLowerCase();
        if (skills.includes(txt)) {
            setShowSkillExists(true);
            return;
        }
        setShowSkillExists(false);
        setSkills([...skills, txt])
        setSkillText('');
    }

    const handleRemoveSkill = (index: any) => {
        setSkills((props.skills as string[]).filter((_, idx) => idx !== index));
    };
    
    const Skill = (s: string, idx: any) => {
        return <div className="job-skill" key={idx}>
                <p>{s}</p>
                <button onClick={() => handleRemoveSkill(idx)} style={{display: skillsEditable ? "":"none"}}>X</button>
              </div>
    }

    return <div className="job-skills-widget-wrapper">
                {
                skillsEditable ? 
                    <div className="text-buddies">
                        <TextField required value={skillText} onChange={(t) => setSkillText(t.target.value)} label="Input Skill (1 Required)"/>
                        <Button onClick={handleAddSkillBtnClick} variant="contained">Add Skill</Button>
                    </div>
                :
                    <></>
                }
                <p style={{color: 'red', display: showSkillExists ? "" : "none", alignSelf: 'start', fontSize:'10px'}}>Skill already exists!</p>
                <div className="job-skills-area">
                {
                    props.skills.map((skill: string, idx: any) => (
                        Skill(skill,idx)
                    ))
                }
                </div>
           </div> 
}