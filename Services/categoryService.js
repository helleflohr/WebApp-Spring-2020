class CategoryService {
    constructor() {
        this.categoryRef = _db.collection("categories");
        this.read();
    }

    read() {
        // ========== READ ==========
        // watch the database ref for changes
        console.log(this.categoryRef);
        // this.categoryRef.onSnapshot(snapshotData => {
        //     let categories = [];
        //     snapshotData.forEach(doc => {
        //         let category = doc.data();
        //         category.id = doc.id;
        //         categories.push(category);
        //     });
        //     // this.appendcategories(categories);
        // });
    }
    // 
    // template() {
    //     console.log(this.categoryRef);
    //     //     document.querySelector('#test').innerHTML += /*html*/ `
    //     //    <p>${this.categoryRef}</p>
    //     //     `;
    // }


}

const _categoryService = new CategoryService();
export default _categoryService;