// Script to identify all files that need to be updated to use stable userId
// This will help reduce the excessive getUser() calls

const filesToUpdate = [
  'src/app/apply/mentor/about-you/page.tsx',
  'src/app/apply/mentor/role/page.tsx',
  'src/app/apply/mentor/thanks/page.tsx',
  'src/app/apply/hacker/about-you/page.tsx',
  'src/app/apply/hacker/demographic/page.tsx',
  'src/app/apply/hacker/mlh-requirements/page.tsx',
  'src/app/apply/hacker/page.tsx',
  'src/app/apply/hacker/short-answers/page.tsx',
  'src/app/apply/hacker/survey/page.tsx',
  'src/app/apply/hacker/thanks/page.tsx',
  'src/app/apply/hacker/view/page.tsx',
  'src/app/apply/dashboard/page.tsx'
];

console.log('Files that need to be updated to use stable userId:');
filesToUpdate.forEach(file => console.log(`- ${file}`));

console.log('\nFor each file, you need to:');
console.log('1. Change "const { user } = useAccount();" to "const { user, userId } = useAccount();"');
console.log('2. Replace "user?.id" with "userId" in useEffect dependencies');
console.log('3. Replace "user.id" with "userId" in database queries');
console.log('4. Add "if (!userId) return;" at the start of useEffect if not already present'); 