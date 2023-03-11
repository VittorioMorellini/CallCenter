import ResponsiveButton, { AddButton, SaveButton, DeleteButton, SearchButton, FilterButton, UndoButton, NextButton, ExportButton, CloneButton, UpdateButton, SendButton } from './button/responsive';
import BusyIndicator from './feedback/busyIndicator';
import Dialog from './feedback/dialog';
import Confirm from './feedback/confirm';
import Panel from './layout/panel';
import IndexView from './view/index';
import DetailView from './view/detail';
import TableView from './view/table';
import SearchView from './view/search';
import ModalView from './view/modal';
import GridView from './view/grid';

export {
    BusyIndicator,
    ResponsiveButton,
    Dialog,
    Confirm,
    Panel,
    IndexView,
    DetailView,
    TableView,
    SearchView,
    ModalView,
    GridView
}

export const Button = {
    Add: AddButton,
    Save: SaveButton,
    Delete: DeleteButton,
    Search: SearchButton,
    Filter: FilterButton,
    Undo: UndoButton,
    Next: NextButton,
    Export: ExportButton,
    Clone: CloneButton,
    Update: UpdateButton,
    Mail: SendButton
}