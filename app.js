document.addEventListener('DOMContentLoaded', () => {
    // 1. Core Header
    document.getElementById('full-name').textContent = `${resumeData.header.firstName} ${resumeData.header.lastName}`;
    document.getElementById('executive-summary').textContent = resumeData.header.summary;

    const contact = resumeData.header.contact;
    document.getElementById('contact-info').innerHTML = `
        ${contact.location} | ${contact.phone} | 
        <a href="mailto:${contact.email}">${contact.email}</a> | 
        LinkedIn:// <a href="https://linkedin.com/in/${contact.linkedin}">${contact.linkedin}</a> | 
        <a href="https://${contact.website}">${contact.website}</a>
    `;

    // 1.5. Leadership Summary
    const leadSection = document.getElementById('leadership-summary');
    if (leadSection && resumeData.leadershipSummary) {
        resumeData.leadershipSummary.forEach(item => {
            const p = document.createElement('p');
            p.style.fontSize = '9.8pt';
            p.style.marginBottom = '0.2rem';
            p.style.lineHeight = '1.25';
            p.innerHTML = `<strong>${item.label}:</strong> ${item.value}`;
            leadSection.appendChild(p);
        });
    }

    // 2. Professional Experience
    const expList = document.getElementById('experience-list');
    resumeData.experience.forEach(item => {
        const div = document.createElement('div');
        div.className = 'experience-item';
        div.innerHTML = `
            <div class="experience-title">
                <h3>${item.company}</h3>
                <span class="location-date">${item.period}</span>
            </div>
            <p class="role">${item.role}</p>
            <ul>
                ${item.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
            </ul>
        `;
        expList.appendChild(div);
    });

    // 3. Cloud Credentials
    const cloudSection = document.getElementById('cloud-credentials');
    resumeData.lateral.cloudCredentials.forEach(prov => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h4>${prov.provider}</h4>
            <p class="location-line">${prov.certs.join(' \\\\ ')}</p>
        `;
        cloudSection.appendChild(div);
    });

    // 4. Strategic Expertise
    const stratSection = document.getElementById('strategic-expertise');
    resumeData.lateral.strategicExpertise.forEach(item => {
        const div = document.createElement('div');
        div.className = 'expertise-block';
        div.innerHTML = `
            <span class="expertise-title">${item.label}</span>
            <p>${item.value}</p>
        `;
        stratSection.appendChild(div);
    });

    // 5. Elite Selection
    const eliteSection = document.getElementById('elite-selection');
    eliteSection.innerHTML = resumeData.lateral.eliteSelection.map(item => `
        <div style="margin-bottom:0.2rem">
            <span style="font-weight:600; font-size:10pt">${item}</span>
        </div>
    `).join('');

    // 6. Academic Pedigree
    const acadSection = document.getElementById('academic-pedigree');
    resumeData.lateral.academicPedigree.forEach(item => {
        const div = document.createElement('div');
        div.style.marginBottom = '0.5rem';
        div.innerHTML = `
            <h4 style="margin-bottom:0">${item.degree}</h4>
            <p class="location-line" style="font-weight:600; font-style:italic">${item.school}</p>
            <p class="location-line" style="margin-top:-0.4rem">${item.location}</p>
        `;
        acadSection.appendChild(div);
    });

    // Set Current Date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', options);
});
