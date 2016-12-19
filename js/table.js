'use strict';

var MultiplicationTable = function() {
  this.resultContainer = document.querySelector('.mt-results');
  this.tableData = [];
  this.highlightedCells = [];

  this.createNewElement = function(el, className) {
    var el = document.createElement(el);
    el.classList.add(className);
    return el;
  }

  this.distributeCells = function(table) {
    for (var row = 1; row < 11; row++) {
      var createRow = this.createNewElement('tr', 'mt-trow');
      var trow = [];
      for (var cell = 1; cell < 11; cell++) {
        var createCell = this.createNewElement('td', 'mt-tcell');
        var resultText = row * cell + ' cells colored';
        createCell.dataset.row = row;
        createCell.dataset.cell = cell;
        createCell.dataset.result = row * cell;
        createCell.setAttribute('title', resultText);
        createCell.innerHTML = row * cell;
        createRow.appendChild(createCell);
        trow.push(createCell);
        if (cell === row) {
          createCell.classList.add('is-square');
        }
      }
      this.tableData.push(trow);
      table.appendChild(createRow);
    }
  }

  this.createTable = function() {
    var table = this.createNewElement('table', 'mt-table');
    table.setAttribute('cellspacing', '0');
    this.distributeCells(table);
    return table;
  }

  this.render = function() {
    var container = document.querySelector('.mt-table-container');
    container.appendChild(this.createTable());
  }

  this.writeResult = function(row, cell) {
    this.resultContainer.innerText = row + ' × ' + cell + ' = ' + row * cell;
  }

  this.highlightCells = function(row, cell, el) {
    var arrayList = this.tableData,
        rowNumber = row - 1,
        cellNumber = cell -1,
        vertNum = arrayList[rowNumber][0],
        horizNum = arrayList[0][cellNumber];

    el.classList.add('is-result');
    vertNum.classList.add('is-data');
    horizNum.classList.add('is-data');
    for (var i = 0; i < arrayList.length; i++) {
      if ( i <= rowNumber ) {
        for (var j = 0; j < arrayList[i].length; j++) {
          if ( j <= cellNumber ) {
            arrayList[i][j].classList.add('is-zone');
            if (j === cellNumber || i === rowNumber) {
              arrayList[i][j].classList.add('is-zone-border');
            }
          }
          this.highlightedCells.push(arrayList[i][j]);
        }
      }
    }
  }

  this.dimCells = function() {
    if ( this.highlightedCells != 0 ) {
      this.highlightedCells.forEach(function(cell) {
        cell.classList.remove('is-zone', 'is-zone-border', 'is-result', 'is-data');
      });
    }
  }

  this.parseCellData = function(row, cell, el) {
    this.dimCells();
    this.highlightCells(row, cell, el);
  }

  this.displayResult = function(e) {
    if ( e.target.nodeName.toLowerCase() === 'td' ) {
      var row = e.target.dataset.row,
          cell = e.target.dataset.cell;
      this.writeResult(row, cell);
      this.parseCellData(row, cell, e.target);
    }
  }

  this.hideResult = function() {
    this.resultContainer.innerText = '';
    this.dimCells();
  }

  this.addEvents = function() {
    var table = document.querySelector('.mt-table');
    table.addEventListener('mouseover', this.displayResult.bind(this));
    table.addEventListener('mouseout', this.hideResult.bind(this));
  }

  this.init = function() {
    this.render();
    table.addEvents();
  }
};

var table = new MultiplicationTable();

table.init();
