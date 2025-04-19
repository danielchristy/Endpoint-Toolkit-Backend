import career from '../models/careersModel.js';
import mongoose from 'mongoose';

const calculateScore = (career, userPreferences) => {
    let score = 0;

    const weights = {
        experience: 35,
        fields: 10,
        skills: 35,
        certifications: 20,
        // other: 10
    };

    if (career.experience === userPreferences.experience) {
        score += weights.experience;
    }

    if (userPreferences.field.includes(career.field)) {
        score += weights.fields;
    }

    const matchingSkills = career.skills.filter(skill =>
        userPreferences.skills.some(userSkill =>
            skill.toLowerCase().includes(userSkill.toLowerCase()) ||
            userSkill.toLowerCase().includes(skill.toLowerCase())
        )
    );
    const skillMatchPercentage = matchingSkills.length / career.skills.length;
    score += skillMatchPercentage * weights.skills;

    const matchingCerts = career.certifications.filter(cert => userPreferences.certifications.includes(cert));
    const certMatchPercentage = matchingCerts.length / career.certifications.length;
    score += certMatchPercentage * weights.certifications;


    // score += weights.other * 0.5;
    // console.log("Career:", career.title);
    // console.log("Matching skills:", matchingSkills);
    // console.log("Matching certs:", matchingCerts);
    // console.log("Field match:", userPreferences.field.includes(career.field));
    // console.log("Score:", score);

    return Number(score);
};

export {
    calculateScore
};
