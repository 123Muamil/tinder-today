
export default function MatchingAlgorithm(currentUser, userData) {
    console.log("Heelo Muzamil",userData)

    const createUserProfile = (user) => {
        return {
            id: user.id,
            values: [user.values_and_mindset], 
            interests: user.interests,
            professionalBackground: user.professional_interests.join(', '),
            personalityTraits: [user.personalization], 
            location: user.location,
            goalRange: mapPrimaryGoalToRange(user.primary_goal)
        };
    };
  
    const mapPrimaryGoalToRange = (goal) => {
        switch (goal) {
            case "Seeking friendships with depth and inspiration.":
                return { min: 1, max: 5 };
            case "Building a network that supports my professional ascent.":
                return { min: 6, max: 10 };
            case "Collaborating to turn ideas into realities.":
                return { min: 11, max: 15 };
            case "Learning from others and sharing my expertise.":
                return { min: 16, max: 20 };
            default:
                return { min: 0, max: 0 };
        }
    };
  
    const calculateMatchScore = (currentUser, userData) => {
        let score = 0;
        const weights = {
            sharedValues: 25,
            sharedInterests: 15,
            professionalBackground: 20,
            personalityTraits: 10,
            proximity: 30,
            goalAlignment: 25,
        };
    
        const sharedValuesScore = userData.values.includes(currentUser.values_and_mindset) ? weights.sharedValues : 0;
        const sharedInterestsScore = currentUser.interests.filter(interest => userData.interests.includes(interest)).length * weights.sharedInterests;
        const professionalBackgroundScore = (currentUser.professionalBackground === userData.professionalBackground) ? weights.professionalBackground : 0;
        const personalityTraitsScore =(currentUser.personalization === userData.personalization) ? weights.personalization:0;
    
        // Accumulate scores, ensuring each category is only counted once
        score += sharedValuesScore + sharedInterestsScore + professionalBackgroundScore + personalityTraitsScore;
    
        // Adjusting proximity logic as an example
        const distance = Math.hypot(currentUser.location.latitude - userData.location.latitude, currentUser.location.longitude - userData.location.longitude);
        const proximityScore = distance <= 50 ? weights.proximity : 0;
        score += proximityScore;
    
        // Goal alignment logic remains the same
        const goalAlignmentScore = (Math.abs(currentUser.goalRange - userData.goalRange) <= 1) ? weights.goalAlignment : 0;
        score += goalAlignmentScore;
    
        // Ensure score does not exceed 100%
        const maxScore = Object.values(weights).reduce((a, b) => a + b);
        const finalScore = (score / maxScore) * 100;
        return finalScore <= 100 ? finalScore : 100;
    };
  
    const compareAllUsers = (currentUser, userData) => {
        const userProfiles = userData.map(createUserProfile);
        let matchScores = [];
    
        userProfiles.forEach(userData => {
            const score = calculateMatchScore(currentUser, userData);
            matchScores.push({
                from: currentUser.id,
                to: userData.id,
                score: `${score.toFixed(2)}%`,
            });
        });
    
        return matchScores;
    };
  
    return compareAllUsers(currentUser, userData);
  }
  