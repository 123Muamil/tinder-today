
// export default function MatchingAlgorithm(currentUser, userData) {
//     console.log("Heelo Muzamil",userData)

//     const createUserProfile = (user) => {
//         return {
//             id: user.id,
//             values: [user.values_and_mindset], 
//             interests: user.interests,
//             professionalBackground: user.professional_interests.join(', '),
//             personalityTraits: [user.personalization], 
//             location: user.location,
//             goalRange: mapPrimaryGoalToRange(user.primary_goal)
//         };
//     };
  
//     const mapPrimaryGoalToRange = (goal) => {
//         switch (goal) {
//             case "Seeking friendships with depth and inspiration.":
//                 return { min: 1, max: 5 };
//             case "Building a network that supports my professional ascent.":
//                 return { min: 6, max: 10 };
//             case "Collaborating to turn ideas into realities.":
//                 return { min: 11, max: 15 };
//             case "Learning from others and sharing my expertise.":
//                 return { min: 16, max: 20 };
//             default:
//                 return { min: 0, max: 0 };
//         }
//     };
  
//     const calculateMatchScore = (currentUser, userData) => {
//         let score = 0;
//         const weights = {
//             sharedValues: 25,
//             sharedInterests: 15,
//             professionalBackground: 20,
//             personalityTraits: 10,
//             proximity: 30,
//             goalAlignment: 25,
//         };
    
//         const sharedValuesScore = userData.values.includes(currentUser.values_and_mindset) ? weights.sharedValues : 0;
//         const sharedInterestsScore = currentUser.interests.filter(interest => userData.interests.includes(interest)).length * weights.sharedInterests;
//         const professionalBackgroundScore = (currentUser.professionalBackground === userData.professionalBackground) ? weights.professionalBackground : 0;
//         const personalityTraitsScore =(currentUser.personalization === userData.personalization) ? weights.personalization:0;
    
//         // Accumulate scores, ensuring each category is only counted once
//         score += sharedValuesScore + sharedInterestsScore + professionalBackgroundScore + personalityTraitsScore;
    
//         // Adjusting proximity logic as an example
//         const distance = Math.hypot(currentUser.location.latitude - userData.location.latitude, currentUser.location.longitude - userData.location.longitude);
//         const proximityScore = distance <= 50 ? weights.proximity : 0;
//         score += proximityScore;
    
//         // Goal alignment logic remains the same
//         const goalAlignmentScore = (Math.abs(currentUser.goalRange - userData.goalRange) <= 1) ? weights.goalAlignment : 0;
//         score += goalAlignmentScore;
    
//         // Ensure score does not exceed 100%
//         const maxScore = Object.values(weights).reduce((a, b) => a + b);
//         const finalScore = (score / maxScore) * 100;
//         return finalScore <= 100 ? finalScore : 100;
//     };
  
//     const compareAllUsers = (currentUser, userData) => {
//         const userProfiles = userData.map(createUserProfile);
//         let matchScores = [];
    
//         userProfiles.forEach(userData => {
//             const score = calculateMatchScore(currentUser, userData);
//             matchScores.push({
//                 from: currentUser.id,
//                 to: userData.id,
//                 score: `${score.toFixed(2)}%`,
//             });
//         });
    
//         return matchScores;
//     };
  
//     return compareAllUsers(currentUser, userData);
//   }
//   import { StyleSheet, Text, View } from 'react-native'
//   import React from 'react'
  
//   const MatchingAlgorithm = () => {
//     return (
//       <View>
//         <Text>MatchingAlgorithm</Text>
//       </View>
//     )
//   }
  
//   export default MatchingAlgorithm
  
//   const styles = StyleSheet.create({})
 const createUserProfile = (user) => {
    return {
        id: user.uid,
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
    // console.log("The user data is:",userData.goalRange)
    // console.log("The current user is:",currentUser[0].primary_goal)
    // const result=mapPrimaryGoalToRange()
    let score = 0;
    const weights = {
        sharedValues: 25,
        sharedInterests: 15,
        professionalBackground: 20,
        personalityTraits: 10,
        proximity: 30,
        goalAlignment: 25,
    };

    const sharedValuesScore = userData.values.includes(currentUser[0].values_and_mindset) ? weights.sharedValues : 0;
    // console.log("The shared values are:",sharedValuesScore)
    const sharedInterestsScore = currentUser[0].interests.filter(interest => userData.interests.includes(interest)).length * weights.sharedInterests;
    // console.log("The sharedinterests are :",sharedInterestsScore)
    const currentUserInterests = currentUser[0].professional_interests.join(', ');
    const userDataInterests = userData.professionalBackground;
    const professionalBackgroundScore = (currentUserInterests === userDataInterests) ? weights.professionalBackground : 0;
    // console.log("The professional backgroundScore is:",professionalBackgroundScore)
    const  personalityTraits=currentUser[0].personalization
    // console.log("The personalization is:",personalityTraits)
    // console.log("The per:",userData.personalityTraits[0])
    const personalityTraitsScore =(personalityTraits === userData.personalityTraits[0]) ? weights.personalityTraits : 0;
    // console.log("The personality traits are:",personalityTraitsScore)
    // // Accumulate scores, ensuring each category is only counted once
    score += sharedValuesScore + sharedInterestsScore + professionalBackgroundScore + personalityTraitsScore;
    // console.log("The score is:",score)
    // // Adjusting proximity logic as an example
    const distance = Math.hypot(currentUser[0].location.latitude - userData.location.latitude, currentUser[0].location.longitude - userData.location.longitude);
    // console.log("The distance is:",distance)
    const proximityScore = distance <= 50 ? weights.proximity : 0;
    score += proximityScore;
    // console.log("The score is:",score)
    // // Goal alignment logic remains the same
    const currentUserGoalRange = mapPrimaryGoalToRange(currentUser[0].primary_goal);
    const goalAlignmentScore = (Math.abs(currentUserGoalRange - userData.goalRange) <= 1) ? weights.goalAlignment : 0;
    // console.log("The goal is:",goalAlignmentScore)
    score += goalAlignmentScore;
    // console.log("The score is:",score)
    // // Ensure score does not exceed 100%
    const maxScore = Object.values(weights).reduce((a, b) => a + b);

    const finalScore = (score / maxScore) * 100;
    // console.log("The final score is:",finalScore)
    return finalScore <= 100 ? finalScore : 100;
};

export const compareAllUsers = (currentUser, userData) => {
    //  console.log("The current user is:",currentUser[0].uid)
    const userProfiles = userData.map(createUserProfile);
    // console.log("The user profile is:",userProfiles)
    let matchScores = [];

    userProfiles.forEach(item => {
        const score = calculateMatchScore(currentUser, item);
        // console.log("The other users data is:",item.id)
        // // console.log("The score is:",score)
        matchScores.push({
            from: currentUser[0].uid,
            to: item.id,
            score: `${score.toFixed(2)}%`,
        });
    });
    // console.log("The score is:",matchScores)
    return matchScores;
};
