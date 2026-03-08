/* ============================================
   ToolkitProo - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initStickyHeader();
    initSmoothScroll();
    initFAQAccordion();
    initToolCalculators();
    initContactForm();
    initAnimations();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Sticky Header
function initStickyHeader() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Tool Calculators
function initToolCalculators() {
    // Mortgage Calculator
    const mortgageForm = document.getElementById('mortgage-form');
    if (mortgageForm) {
        mortgageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateMortgage();
        });
    }
    
    // Loan Repayment Calculator
    const loanForm = document.getElementById('loan-form');
    if (loanForm) {
        loanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateLoan();
        });
    }
    
    // Savings Calculator
    const savingsForm = document.getElementById('savings-form');
    if (savingsForm) {
        savingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateSavings();
        });
    }
    
    // VAT Calculator
    const vatForm = document.getElementById('vat-form');
    if (vatForm) {
        vatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateVAT();
        });
    }
    
    // Profit Margin Calculator
    const profitForm = document.getElementById('profit-form');
    if (profitForm) {
        profitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateProfit();
        });
    }
    
    // ROI Calculator
    const roiForm = document.getElementById('roi-form');
    if (roiForm) {
        roiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateROI();
        });
    }
    
    // Stamp Duty Calculator
    const stampDutyForm = document.getElementById('stampduty-form');
    if (stampDutyForm) {
        stampDutyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateStampDuty();
        });
    }
    
    // Rent Affordability Calculator
    const rentForm = document.getElementById('rent-form');
    if (rentForm) {
        rentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateRentAffordability();
        });
    }
    
    // Property ROI Calculator
    const propertyRoiForm = document.getElementById('property-roi-form');
    if (propertyRoiForm) {
        propertyRoiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculatePropertyROI();
        });
    }
}

// Mortgage Calculator
function calculateMortgage() {
    const price = parseFloat(document.getElementById('mortgage-price').value);
    const deposit = parseFloat(document.getElementById('mortgage-deposit').value);
    const rate = parseFloat(document.getElementById('mortgage-rate').value);
    const years = parseInt(document.getElementById('mortgage-years').value);
    
    if (isNaN(price) || isNaN(deposit) || isNaN(rate) || isNaN(years)) {
        alert('Please fill in all fields correctly');
        return;
    }
    
    const principal = price - deposit;
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;
    
    document.getElementById('mortgage-result').innerHTML = `
        <div class="result-item">
            <h4>Monthly Payment</h4>
            <div class="result-value">£${monthlyPayment.toFixed(2)}</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Total Interest</h4>
            <div class="result-value" style="font-size: 1.25rem;">£${totalInterest.toFixed(2)}</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Total Cost</h4>
            <div class="result-value" style="font-size: 1.25rem;">£${totalPayment.toFixed(2)}</div>
        </div>
    `;
}

// Loan Repayment Calculator
function calculateLoan() {
    const amount = parseFloat(document.getElementById('loan-amount').value);
    const rate = parseFloat(document.getElementById('loan-rate').value);
    const years = parseInt(document.getElementById('loan-years').value);
    
    if (isNaN(amount) || isNaN(rate) || isNaN(years)) {
        alert('Please fill in all fields correctly');
        return;
    }
    
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    
    const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - amount;
    
    document.getElementById('loan-result').innerHTML = `
        <div class="result-item">
            <h4>Monthly Payment</h4>
            <div class="result-value">£${monthlyPayment.toFixed(2)}</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Total Interest</h4>
            <div class="result-value" style="font-size: 1.25rem;">£${totalInterest.toFixed(2)}</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Total Repayment</h4>
            <div class="result-value" style="font-size: 1.25rem;">£${totalPayment.toFixed(2)}</div>
        </div>
    `;
}

// Savings Calculator
function calculateSavings() {
    const initial = parseFloat(document.getElementById('savings-initial').value) || 0;
    const monthly = parseFloat(document.getElementById('savings-monthly').value);
    const rate = parseFloat(document.getElementById('savings-rate').value);
    const years = parseInt(document.getElementById('savings-years').value);
    
    if (isNaN(monthly) || isNaN(rate) || isNaN(years)) {
        alert('Please fill in all fields correctly');
        return;
    }
    
    const monthlyRate = rate / 100 / 12;
    const numMonths = years * 12;
    
    let total = initial * Math.pow(1 + monthlyRate, numMonths);
    if (monthlyRate > 0) {
        total += monthly * (Math.pow(1 + monthlyRate, numMonths) - 1) / monthlyRate;
    } else {
        total += monthly * numMonths;
    }
    
    const totalContributed = initial + (monthly * numMonths);
    const interestEarned = total - totalContributed;
    
    document.getElementById('savings-result').innerHTML = `
        <div class="result-item">
            <h4>Final Balance</h4>
            <div class="result-value">£${total.toFixed(2)}</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Interest Earned</h4>
            <div class="result-value" style="font-size: 1.25rem;">£${interestEarned.toFixed(2)}</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Total Contributed</h4>
            <div class="result-value" style="font-size: 1.25rem;">£${totalContributed.toFixed(2)}</div>
        </div>
    `;
}

// VAT Calculator
function calculateVAT() {
    const amount = parseFloat(document.getElementById('vat-amount').value);
    const rate = parseFloat(document.getElementById('vat-rate').value);
    const type = document.getElementById('vat-type').value;
    
    if (isNaN(amount) || isNaN(rate)) {
        alert('Please fill in all fields correctly');
        return;
    }
    
    let netAmount, vatAmount, grossAmount;
    
    if (type === 'add') {
        netAmount = amount;
        vatAmount = amount * (rate / 100);
        grossAmount = netAmount + vatAmount;
    } else {
        grossAmount = amount;
        netAmount = amount / (1 + rate / 100);
        vatAmount = grossAmount - netAmount;
    }
    
    document.getElementById('vat-result').innerHTML = `
        <div class="result-item">
            <h4>Net Amount</h4>
            <div class="result-value">£${netAmount.toFixed(2)}</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>VAT Amount (${rate}%)</h4>
            <div class="result-value" style="font-size: 1.25rem;">£${vatAmount.toFixed(2)}</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Gross Amount</h4>
            <div class="result-value" style="font-size: 1.25rem;">£${grossAmount.toFixed(2)}</div>
        </div>
    `;
}

// Profit Margin Calculator
function calculateProfit() {
    const cost = parseFloat(document.getElementById('profit-cost').value);
    const price = parseFloat(document.getElementById('profit-price').value);
    
    if (isNaN(cost) || isNaN(price)) {
        alert('Please fill in all fields correctly');
        return;
    }
    
    const profit = price - cost;
    const marginPercent = (profit / price) * 100;
    const markupPercent = (profit / cost) * 100;
    
    document.getElementById('profit-result').innerHTML = `
        <div class="result-item">
            <h4>Profit Amount</h4>
            <div class="result-value">£${profit.toFixed(2)}</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Profit Margin</h4>
            <div class="result-value" style="font-size: 1.25rem;">${marginPercent.toFixed(2)}%</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Markup Percentage</h4>
            <div class="result-value" style="font-size: 1.25rem;">${markupPercent.toFixed(2)}%</div>
        </div>
    `;
}

// ROI Calculator
function calculateROI() {
    const invested = parseFloat(document.getElementById('roi-invested').value);
    const returned = parseFloat(document.getElementById('roi-returned').value);
    const years = parseFloat(document.getElementById('roi-years').value) || 1;
    
    if (isNaN(invested) || isNaN(returned)) {
        alert('Please fill in all fields correctly');
        return;
    }
    
    const profit = returned - invested;
    const roi = (profit / invested) * 100;
    const annualizedRoi = (Math.pow(returned / invested, 1 / years) - 1) * 100;
    
    document.getElementById('roi-result').innerHTML = `
        <div class="result-item">
            <h4>Total ROI</h4>
            <div class="result-value">${roi.toFixed(2)}%</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Profit Amount</h4>
            <div class="result-value" style="font-size: 1.25rem;">£${profit.toFixed(2)}</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Annualized ROI</h4>
            <div class="result-value" style="font-size: 1.25rem;">${annualizedRoi.toFixed(2)}%</div>
        </div>
    `;
}

// Stamp Duty Calculator (UK)
function calculateStampDuty() {
    const price = parseFloat(document.getElementById('stampduty-price').value);
    const isFirstTime = document.getElementById('stampduty-firsttime').value === 'yes';
    const isAdditional = document.getElementById('stampduty-additional').value === 'yes';
    
    if (isNaN(price)) {
        alert('Please enter a valid property price');
        return;
    }
    
    let stampDuty = 0;
    
    if (isFirstTime && price <= 425000) {
        stampDuty = 0;
    } else if (isFirstTime && price <= 625000) {
        stampDuty = (price - 425000) * 0.05;
    } else {
        // Standard rates
        if (price > 250000) {
            const bands = [
                { limit: 250000, rate: 0 },
                { limit: 925000, rate: 0.05 },
                { limit: 1500000, rate: 0.10 },
                { limit: Infinity, rate: 0.12 }
            ];
            
            let remaining = price;
            let previousLimit = 0;
            
            for (const band of bands) {
                if (remaining > 0) {
                    const taxable = Math.min(remaining, band.limit - previousLimit);
                    stampDuty += taxable * band.rate;
                    remaining -= taxable;
                    previousLimit = band.limit;
                }
            }
        }
    }
    
    // Additional property surcharge
    if (isAdditional) {
        stampDuty += price * 0.03;
    }
    
    const effectiveRate = (stampDuty / price) * 100;
    
    document.getElementById('stampduty-result').innerHTML = `
        <div class="result-item">
            <h4>Stamp Duty Payable</h4>
            <div class="result-value">£${stampDuty.toFixed(2)}</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Effective Tax Rate</h4>
            <div class="result-value" style="font-size: 1.25rem;">${effectiveRate.toFixed(2)}%</div>
        </div>
    `;
}

// Rent Affordability Calculator
function calculateRentAffordability() {
    const income = parseFloat(document.getElementById('rent-income').value);
    const partnerIncome = parseFloat(document.getElementById('rent-partner').value) || 0;
    const expenses = parseFloat(document.getElementById('rent-expenses').value) || 0;
    
    if (isNaN(income)) {
        alert('Please enter your monthly income');
        return;
    }
    
    const totalIncome = income + partnerIncome;
    const disposableIncome = totalIncome - expenses;
    const maxRent30 = totalIncome * 0.30;
    const maxRent35 = totalIncome * 0.35;
    
    document.getElementById('rent-result').innerHTML = `
        <div class="result-item">
            <h4>Total Monthly Income</h4>
            <div class="result-value">£${totalIncome.toFixed(2)}</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Max Rent (30% rule)</h4>
            <div class="result-value" style="font-size: 1.25rem; color: #22c55e;">£${maxRent30.toFixed(2)}</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Max Rent (35% limit)</h4>
            <div class="result-value" style="font-size: 1.25rem; color: #f59e0b;">£${maxRent35.toFixed(2)}</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Disposable Income</h4>
            <div class="result-value" style="font-size: 1.25rem;">£${disposableIncome.toFixed(2)}</div>
        </div>
    `;
}

// Property ROI Calculator
function calculatePropertyROI() {
    const purchasePrice = parseFloat(document.getElementById('prop-purchase').value);
    const renovation = parseFloat(document.getElementById('prop-renovation').value) || 0;
    const monthlyRent = parseFloat(document.getElementById('prop-rent').value);
    const monthlyExpenses = parseFloat(document.getElementById('prop-expenses').value) || 0;
    
    if (isNaN(purchasePrice) || isNaN(monthlyRent)) {
        alert('Please fill in all required fields');
        return;
    }
    
    const totalInvestment = purchasePrice + renovation;
    const annualRent = monthlyRent * 12;
    const annualExpenses = monthlyExpenses * 12;
    const netAnnualIncome = annualRent - annualExpenses;
    const roi = (netAnnualIncome / totalInvestment) * 100;
    const monthlyCashFlow = monthlyRent - monthlyExpenses;
    
    document.getElementById('property-roi-result').innerHTML = `
        <div class="result-item">
            <h4>Annual ROI</h4>
            <div class="result-value">${roi.toFixed(2)}%</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Monthly Cash Flow</h4>
            <div class="result-value" style="font-size: 1.25rem;">£${monthlyCashFlow.toFixed(2)}</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Annual Net Income</h4>
            <div class="result-value" style="font-size: 1.25rem;">£${netAnnualIncome.toFixed(2)}</div>
        </div>
        <div class="result-item" style="margin-top: 16px;">
            <h4>Total Investment</h4>
            <div class="result-value" style="font-size: 1.25rem;">£${totalInvestment.toFixed(2)}</div>
        </div>
    `;
}

// Invoice Generator
function generateInvoice() {
    const companyName = document.getElementById('inv-company').value;
    const clientName = document.getElementById('inv-client').value;
    const amount = parseFloat(document.getElementById('inv-amount').value);
    const description = document.getElementById('inv-desc').value;
    
    if (!companyName || !clientName || isNaN(amount)) {
        alert('Please fill in all required fields');
        return;
    }
    
    const vat = amount * 0.20;
    const total = amount + vat;
    const invoiceNumber = 'INV-' + Date.now().toString().slice(-8);
    const date = new Date().toLocaleDateString('en-GB');
    
    const invoiceHTML = `
        <div style="background: white; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
                <div>
                    <h3 style="margin: 0; color: #6366f1;">${companyName}</h3>
                    <p style="margin: 5px 0 0; color: #64748b;">Invoice #: ${invoiceNumber}</p>
                </div>
                <div style="text-align: right;">
                    <p style="margin: 0; font-weight: 600;">Date: ${date}</p>
                </div>
            </div>
            <div style="margin-bottom: 30px;">
                <h4 style="margin: 0 0 10px; color: #1e293b;">Bill To:</h4>
                <p style="margin: 0; color: #64748b;">${clientName}</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <thead>
                    <tr style="background: #f8fafc;">
                        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Description</th>
                        <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e2e8f0;">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${description || 'Services'}</td>
                        <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e2e8f0;">£${amount.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <div style="text-align: right;">
                <p style="margin: 5px 0;">Subtotal: £${amount.toFixed(2)}</p>
                <p style="margin: 5px 0;">VAT (20%): £${vat.toFixed(2)}</p>
                <p style="margin: 10px 0 0; font-size: 1.25rem; font-weight: 700; color: #6366f1;">Total: £${total.toFixed(2)}</p>
            </div>
        </div>
    `;
    
    document.getElementById('invoice-result').innerHTML = invoiceHTML;
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .tool-card, .blog-card, .tool-widget').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP'
    }).format(amount);
}

// Utility function to debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
