import React,{Component} from 'react'
import { AgGridReact } from 'ag-grid-react';
// import  {AllModules}  from 'ag-grid-enterprise';
import  AllModules  from 'ag-grid-enterprise/';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ClientSideRowModelModule } from 'ag-grid-community/';
import  MasterDetailModule  from 'ag-grid-enterprise/';
import  MenuModule  from 'ag-grid-enterprise/';
import ColumnsToolPanelModule  from 'ag-grid-enterprise/';
import './App.css'
import {data} from './data'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: ClientSideRowModelModule,MasterDetailModule,MenuModule,ColumnsToolPanelModule,AllModules,
      columnDefs: [
          {
            headerName: 'UID',
            field: 'uid',
            cellRenderer: 'agGroupCellRenderer',  
          },
          {
            headerName: 'Product Name',
            field: 'productName',
          },
          {
            headerName: 'Brand',
            field: 'brand',      
          },
          {
            headerName: 'Purchased Date',
            field: 'purchasedDate',
          },
  
          {
            headerName: 'Price',
            field: 'price',    
          },
          {
            headerName: ' Offered Price',
            field: 'offeredPrice',
          },
          {
            headerName: 'Expriation Date',
            field: 'expriationDate',
          },
          {
            headerName: 'Total Batches',
            field: 'totalBaches',
          },
          {
            headerName: 'Quantity',
            field: 'quantity', 
          },
          {
            headerName: 'Price per unit/gram',
            field: 'priceperunit',
          },
          {
            headerName: 'Unit Size',
            field: 'unitSize', 
          },
          {
            headerName: 'Unit Type',
            field: 'unitType',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
              values: ['Porsche', 'Toyota', 'Ford', 'AAA', 'BBB', 'CCC'],
            },
          },
          {
            headerName: 'Actions',
            field: 'actions',   
           },
        ],
        defaultColDef: { 
          flex: 1,
          editable: true, 
        
        },
        detailCellRendererParams: {
          detailGridOptions: {
            columnDefs: [
              { field: 'brandId' },
              { field: 'created' },
              {
                field: 'expirationDate',
                minWidth: 150,
              },
              {
                field: 'quantity',
                valueFormatter: "x.toLocaleString() + 's'",
              },
              {
                field: 'inventory',
                minWidth: 150,
              },
              {
                field: 'unitType',
                minWidth: 150,
              },
              {
                field:'vendor',
                minWidth: 150
              },
              {
                field:'price',
                minWidth: 150
              },
            ],
            defaultColDef: { flex: 1 ,editable: true,},
          },
          getDetailRowData: function(params) {
            console.log(params,"params")
            params.successCallback(params.data.batchRecord);
          },
        },
        rowData: data,
        defaultColDef: {
          sortable: true,
          editable: true,
        },
        rowSelection: 'single',
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onFirstDataRendered = params => {
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setFocusedCell(2, 'unitType');
    this.gridApi.startEditingCell({
      // rowIndex: 2,
      colKey: 'unitType',
    });
    setTimeout(function() {
      params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);
  };


  render() {
    return (
      <div className="ag-theme-alpine" style={ {height: '500px', width: '99%'} }>
        <AgGridReact
        modules={this.state.modules}
        columnDefs={this.state.columnDefs}
        defaultColDef={this.state.defaultColDef}
        masterDetail={true}
        detailCellRendererParams={this.state.detailCellRendererParams}
        onGridReady={this.onGridReady}
        onFirstDataRendered={this.onFirstDataRendered}
        rowData={this.state.rowData}
        defaultColDef= {this.state.defaultColDef}
        rowSelection={this.state.rowSelection}  
        
        >
        </AgGridReact>
      </div>
    );
  }
}

export default App