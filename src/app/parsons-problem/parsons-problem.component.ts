import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { Question } from './question.model';
import { Router } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';


declare var ParsonsWidget: any;

@Component({
  selector: 'app-parsons-problem',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatIconModule, 
    ToolbarComponent
  ],
  templateUrl: './parsons-problem.component.html',
  styleUrls: ['./parsons-problem.component.css']
})
export class ParsonsProblemComponent implements OnInit {
  username: string = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}').username || 'Guest';


  constructor(private router: Router) {}



  parsons: any;
  pageSize = 1; // Number of questions per page
  pageIndex = 0; // Current page index
  paginatedQuestions: Question[] = []; // Holds the current question(s) based on pagination

  questions: Question[] = [
    { id: 1, section: 'Section 1', content: 'What is database normalization?', code: ["def define_normalization():", "    return 'Normalization is a process for organizing data to reduce redundancy.'", "print(define_normalization())"] },
    { id: 2, section: 'Section 1', content: 'Define the First Normal Form (1NF).', code: ["def first_normal_form():", "    return '1NF ensures each column has atomic (indivisible) values.'", "print(first_normal_form())"] },
    { id: 3, section: 'Section 1', content: 'Explain the purpose of normalization.', code: ["def purpose_of_normalization():", "    print('The purpose of normalization is to reduce data redundancy and improve data integrity.')", "purpose_of_normalization()"] },
    { id: 4, section: 'Section 2', content: 'What is the Second Normal Form (2NF)?', code: ["def second_normal_form():", "    return '2NF removes partial dependencies on a composite key.'", "print(second_normal_form())"] },
    { id: 5, section: 'Section 2', content: 'Explain partial dependency in normalization.', code: ["def partial_dependency():", "    return 'A partial dependency occurs when a non-prime attribute is dependent on part of a composite key.'", "print(partial_dependency())"] },
    { id: 6, section: 'Section 2', content: 'How do you achieve 2NF?', code: ["def achieve_2nf():", "    print('To achieve 2NF, remove partial dependencies by placing attributes in a separate table.')", "achieve_2nf()"] },
    { id: 7, section: 'Section 3', content: 'What is the Third Normal Form (3NF)?', code: ["def third_normal_form():", "    return '3NF removes transitive dependencies to ensure each attribute depends only on the primary key.'", "print(third_normal_form())"] },
    { id: 8, section: 'Section 3', content: 'What is transitive dependency?', code: ["def transitive_dependency():", "    return 'A transitive dependency occurs when a non-key attribute depends on another non-key attribute.'", "print(transitive_dependency())"] },
    { id: 9, section: 'Section 4', content: 'Define Boyce-Codd Normal Form (BCNF).', code: ["def bcnf_definition():", "    print('BCNF is a stronger version of 3NF where every determinant is a candidate key.')", "bcnf_definition()"] },
    { id: 10, section: 'Section 4', content: 'How does BCNF differ from 3NF?', code: ["def bcnf_vs_3nf():", "    print('BCNF eliminates anomalies that 3NF may not prevent by enforcing stricter conditions.')", "bcnf_vs_3nf()"] }
  ];

  currentQuestion: Question = this.questions[0];
  videoSrc: string = "";

  ngOnInit(): void {
    const user = sessionStorage.getItem('loggedInUser');
    this.setBackgroundVideo('fluffy_cloud.mp44');
    //this.setBackgroundVideo('mountainwater_sunset.mp4');
  
    if (!user) {
      this.router.navigate(['/']); // Redirect to login if not logged in
    }

    console.log('ParsonsProblemComponent initialized for user:', this.username);
    this.updatePaginatedQuestions();
  }

  setBackgroundVideo(fileName: string): void {
    // Set the path dynamically relative to 'src/assets/backgrounds'
    this.videoSrc = "assets/backgrounds/" + fileName;
    //this.videoSrc = "assets/backgrounds/sunset.mp4";
  }


  initializeParsons(question: Question): void {
    if (this.parsons) {
      this.parsons.clear();
    }
  
    this.parsons = new ParsonsWidget({
      sortableId: 'sortable',
      trashId: 'sortableTrash',
      max_wrong_lines: 1,
      feedback_cb: (feedback: string) => console.log(feedback)
    });
  
    const codeString = question.code.join('\n');
    console.log('Initializing ParsonsWidget with code:', codeString);
  
    setTimeout(() => {
      this.parsons.init(codeString);
      this.parsons.shuffleLines();
      console.log('ParsonsWidget initialized successfully.');
    }, 0); // Ensure DOM elements are rendered
    console.log(codeString);
  }
  


  getFeedback(): void {
    if (this.parsons) {
      const feedback = this.parsons.getFeedback();
      if (feedback.trim() === "") {
        alert("Correct solution!");
      } else {
        alert(feedback);
      }
    }
  }

  // Method to handle pagination changes
  handlePageEvent(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedQuestions(); // Load the new question based on pagination
  }

  // Method to update the paginated questions based on the current page
  updatePaginatedQuestions(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedQuestions = this.questions.slice(start, end);

    if (this.paginatedQuestions.length > 0) {
      this.initializeParsons(this.paginatedQuestions[0]);
    }
  }

  
}
