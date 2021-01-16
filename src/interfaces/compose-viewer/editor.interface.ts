export enum EditorIndexMap {
    'BaseEditor',
    'QuestionEditor',
    'KnowledgeEditor',
    'CapacityEditor'
}

export enum EditorNameMap {
    'BaseEditor' = '基础信息编辑',
    'QuestionEditor' = '试题结构编辑',
    'KnowledgeEditor' = '考试目标知识点编辑',
    'CapacityEditor' = '考试目标能力点编辑'
}

export enum BaseEditorOperations {
    COURSE_CODE_SELECT = 'course_code_select',
    COURSE_NAME_SELECT = 'course_name_select',
    PAPER_SCORE_INPUT = 'paper_score_input',
    PAPER_DIFFICULTY_SELECT = 'paper_difficulty_select'
}